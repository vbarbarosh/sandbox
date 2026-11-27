/* The engine of practice.html: runs the code of a topic on its cases, beside the reference solution.

   practice_worker_main() is never called in the page: its source is the whole of a Worker, so an endless loop
   costs the Worker and never the page. Everything it needs is nested inside it.

   A message in: {run_id, source, reference, fn, observe, check, is_pure, cases, is_reference_only}.
   For each case a message out, in order: {run_id, index, status, expected, actual, args, message, logs};
   status is "pass", "fail" or "error", or "expected" when only the reference runs. Then {run_id, done: true}.
   Between the reference and the attempt of a case, {run_id, is_reference_done: true}: the page's time limit
   starts again there, so it is the attempt's alone.
   The values going out are plain copies, bounded in size; the comparison is made here, on the whole values. */
function practice_worker_main()
{
    const NUMBER_TOLERANCE = 1e-9;
    const PLAIN_BUDGET = 6000;
    const PLAIN_DEPTH_LIMIT = 150;
    const PLAIN_ARRAY_LIMIT = 2000;
    const LOGS_LIMIT = 50;
    const LOG_TEXT_LIMIT = 500;

    let logs = [];

    const console_captured = {
        log: log_push,
        info: log_push,
        warn: log_push,
        error: log_push,
        debug: log_push,
        table: log_push,
    };

    self.onmessage = function (event) {
        const job = event.data;
        let fn_attempt = null;
        let fn_reference = null;
        let source_error = null;
        try {
            fn_reference = fn_from_source(job.reference, job.fn);
        }
        catch (error) {
            source_error = `The reference solution does not run: ${text_from_error(error)}`;
        }
        if (!job.is_reference_only && !source_error) {
            try {
                fn_attempt = fn_from_source(job.source, job.fn);
                if (!fn_attempt) {
                    source_error = `No function named ${job.fn} was found. Keep the name from the starter code.`;
                }
            }
            catch (error) {
                source_error = text_from_error(error);
            }
        }
        for (let i = 0, end = job.cases.length; i < end; ++i) {
            const result = source_error ? {status: 'error', message: source_error, logs: []} : case_run(job, job.cases[i], fn_attempt, fn_reference);
            self.postMessage(Object.assign({run_id: job.run_id, index: i}, result));
        }
        self.postMessage({run_id: job.run_id, done: true});
    };

    function fn_from_source(source, fn) {
        const factory = new Function('console', `"use strict";\n${source}\nreturn (typeof ${fn} === "function") ? ${fn} : null;`);
        return factory(console_captured);
    }

    /* the reference runs first, on args of its own; then the attempt, on fresh args */
    function case_run(job, item, fn_attempt, fn_reference) {
        logs = [];
        let expected = null;
        try {
            expected = case_observe(job, item, fn_reference).observed;
        }
        catch (error) {
            return {status: 'error', message: `The reference solution fails on this case: ${text_from_error(error)}`, logs: []};
        }
        if (job.is_reference_only) {
            return {status: 'expected', expected: plain_from_value(expected), args: shown_args_from_item(item), logs: []};
        }
        self.postMessage({run_id: job.run_id, is_reference_done: true});
        logs = [];
        let attempt = null;
        try {
            attempt = case_observe(job, item, fn_attempt);
        }
        catch (error) {
            return {status: 'error', expected: plain_from_value(expected), message: text_from_error(error), logs};
        }
        const is_matched = is_deep_equal(attempt.observed, expected);
        const message = is_matched ? flaw_find(job, item, attempt) : null;
        return {
            status: (is_matched && !message) ? 'pass' : 'fail',
            expected: plain_from_value(expected),
            actual: plain_from_value(attempt.observed),
            message,
            logs,
        };
    }

    function case_observe(job, item, fn) {
        switch (item.kind || 'plain') {
        case 'probe':
            return {observed: node_observe(fn(node_pick(item.tree, item.start)))};
        case 'steps':
            return {observed: uids_from_steps(fn, item.tree, item.start)};
        case 'lazy':
            return {observed: laziness_observe(fn)};
        default:
            return plain_case_observe(job, item, fn);
        }
    }

    function plain_case_observe(job, item, fn) {
        const args = args_make(item.args);
        const result = fn(...args);
        return {args, result, observed: result_observe(job.observe, result, args)};
    }

    function result_observe(observe, result, args) {
        switch (observe) {
        case 'node':
            return node_observe(result);
        case 'edit':
            return {returned: result, tree: args[0]};
        case 'iterable':
            return iterable_observe(result);
        case 'parents':
            return parents_observe(args[0]);
        case 'geometry':
            return geometry_observe(args[0]);
        default:
            return result;
        }
    }

    /* a result can be equal to the expected one and still break a rule of the topic */
    function flaw_find(job, item, attempt) {
        if ((item.kind || 'plain') !== 'plain') {
            return null;
        }
        if ((job.check === 'same_node') && is_object(attempt.result) && !nodes_from_tree(attempt.args[0]).includes(attempt.result)) {
            return 'Return the node object from the tree itself, not a copy of it.';
        }
        if ((job.check === 'fresh_nodes') && is_nodes_shared(attempt.result, attempt.args[0])) {
            return 'The result shares node objects with the input. Build new nodes for it.';
        }
        if (job.is_pure && !is_deep_equal(attempt.args, args_make(item.args))) {
            return 'The arguments were changed. This function must leave its input untouched.';
        }
        return null;
    }

    function is_nodes_shared(result, root) {
        const originals = new Set(nodes_from_tree(root));
        for (const node of nodes_from_tree(result)) {
            if (originals.has(node)) {
                return true;
            }
        }
        return false;
    }

    /* the args of a case are data; four markers stand for what data cannot hold:
       {$fn: "<source>"} is a function, {$make: "chain", size} a chain too deep to write down,
       {$make: "numbers", size, max, seed} an array too long to write down, and
       {$make: "table", size, seed, version} a table of rows too long to write down, "before" or "after" */
    function args_make(args) {
        const out = [];
        for (const arg of structuredClone(args)) {
            out.push(arg_make(arg));
        }
        return out;
    }

    function arg_make(arg) {
        if (!is_object(arg) || Array.isArray(arg)) {
            return arg;
        }
        if (typeof arg.$fn === 'string') {
            return new Function(`"use strict";\nreturn (${arg.$fn});`)();
        }
        if (arg.$make === 'chain') {
            return tree_make_deep_chain(arg.size);
        }
        if (arg.$make === 'numbers') {
            return numbers_from_seed(arg.seed, arg.size, arg.max);
        }
        if (arg.$make === 'table') {
            return table_from_seed(arg.seed, arg.size, arg.version);
        }
        return arg;
    }

    /* the args as the page shows them: a function by its source, a deep chain by its size */
    function shown_args_from_item(item) {
        if ((item.kind || 'plain') !== 'plain') {
            return [];
        }
        return item.args;
    }

    function tree_make_deep_chain(count) {
        const out = {uid: 'n0', children: []};

        let tail = out;
        for (let i = 1; i < count; ++i) {
            const node = {uid: `n${i}`, children: []};
            tail.children.push(node);
            tail = node;
        }
        return out;
    }

    function node_pick(tree, uid) {
        const root = tree_link_parents(structuredClone(tree));
        for (const node of nodes_from_tree(root)) {
            if (node.uid === uid) {
                return node;
            }
        }
        return null;
    }

    function tree_link_parents(root) {
        root.parent = null;
        for (const node of nodes_from_tree(root)) {
            for (const child of node.children) {
                child.parent = node;
            }
        }
        return root;
    }

    function node_observe(result) {
        return (is_object(result) && !Array.isArray(result)) ? {node: result.uid} : result;
    }

    function iterable_observe(result) {
        if (!is_object(result) || (typeof result[Symbol.iterator] !== 'function')) {
            return result;
        }
        const out = [];
        for (const item of result) {
            out.push(is_tree_like(item) ? item.uid : {not_a_node: plain_from_value(item)});
            if (out.length > 5000) {
                out.push('… still yielding');
                break;
            }
        }
        return out;
    }

    function parents_observe(root) {
        const out = {};
        const nodes = nodes_from_tree(root);
        const parent_by_node = new Map();
        for (const node of nodes) {
            for (const child of node.children) {
                parent_by_node.set(child, node);
            }
        }
        for (const node of nodes) {
            out[node.uid] = parent_describe(node, parent_by_node.get(node) || null);
        }
        return out;
    }

    /* the uid of the parent a node points at when that is its real parent, else a note saying what is there */
    function parent_describe(node, parent) {
        if (!('parent' in node)) {
            return '(no parent field)';
        }
        if (node.parent === parent) {
            return parent ? parent.uid : null;
        }
        if (is_object(node.parent)) {
            return `(a different object: ${JSON.stringify(node.parent.uid)})`;
        }
        return `(${JSON.stringify(node.parent)})`;
    }

    function geometry_observe(root) {
        const out = {};
        for (const node of nodes_from_tree(root)) {
            out[node.uid] = [node.x, node.y];
        }
        return out;
    }

    /* pulls three nodes from a 2,000-node tree; a lazy walk reads `children` a few times, an eager one thousands */
    function laziness_observe(fn) {
        const counter = {reads: 0};
        const root = tree_from_seed(21, 2000);
        for (const node of nodes_from_tree(root)) {
            const children = node.children;
            Object.defineProperty(node, 'children', {
                enumerable: true,
                get: function () {
                    counter.reads += 1;
                    return children;
                },
            });
        }
        counter.reads = 0;
        const iterator = fn(root)[Symbol.iterator]();
        const first_uids = [];
        for (let i = 0; i < 3; ++i) {
            const step = iterator.next();
            first_uids.push(is_object(step.value) ? step.value.uid : step.value);
        }
        return {first_uids, is_lazy: counter.reads < 200};
    }

    /* the same seed always gives the same tree: node i hangs under an earlier node picked by the seeded generator */
    function tree_from_seed(seed, count) {
        const rand = rand_make(seed);
        const nodes = [{uid: 'n0', children: []}];
        for (let i = 1; i < count; ++i) {
            const node = {uid: `n${i}`, children: []};
            nodes[Math.floor(rand()*nodes.length)].children.push(node);
            nodes.push(node);
        }
        return nodes[0];
    }

    /* the same seed always gives the same numbers: `size` whole numbers from 0 to max - 1 */
    function numbers_from_seed(seed, size, max) {
        const rand = rand_make(seed);
        const out = [];
        for (let i = 0; i < size; ++i) {
            out.push(Math.floor(rand()*max));
        }
        return out;
    }

    /* the same seed always gives the same table: `size` rows {id, name, price} in a random order, ids from 1 to
       size; version "after" is that table a while later: one row in 50 gone, one in 50 changed, size/50 new */
    function table_from_seed(seed, size, version) {
        const rand = rand_make(seed);
        const rows = [];
        for (let id = 1; id <= size; ++id) {
            rows.push({id, name: `item ${id}`, price: Math.floor(rand()*10000)});
        }
        return items_shuffle((version === 'after') ? table_edit(rows, rand) : rows, rand);
    }

    function table_edit(rows, rand) {
        const out = [];
        for (const row of rows) {
            const roll = rand();
            if (roll < 0.02) {
                continue;
            }
            if (roll < 0.03) {
                out.push({id: row.id, name: `${row.name}, renamed`, price: row.price});
            }
            else if (roll < 0.04) {
                out.push({id: row.id, name: row.name, price: row.price + 1 + Math.floor(rand()*100)});
            }
            else {
                out.push(row);
            }
        }
        for (let i = 1, end = Math.floor(rows.length/50); i <= end; ++i) {
            const id = rows.length + i;
            out.push({id, name: `item ${id}`, price: Math.floor(rand()*10000)});
        }
        return out;
    }

    /* Fisher-Yates, in place */
    function items_shuffle(items, rand) {
        for (let i = items.length - 1; i > 0; --i) {
            const j = Math.floor(rand()*(i + 1));
            const item = items[i];
            items[i] = items[j];
            items[j] = item;
        }
        return items;
    }

    function rand_make(seed) {
        let current = seed | 0;
        return function () {
            current = (current + 0x6D2B79F5) | 0;
            let mixed = Math.imul(current ^ (current >>> 15), 1 | current);
            mixed = (mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)) ^ mixed;
            return ((mixed ^ (mixed >>> 14)) >>> 0)/4294967296;
        };
    }

    /* calls step(node) again and again from the start and records the uids it passes; null ends the walk */
    function uids_from_steps(step, tree, start_uid) {
        const root = tree_link_parents(structuredClone(tree));
        const nodes = nodes_from_tree(root);
        const limit = nodes.length + 2;

        let node = nodes.find(v => v.uid === start_uid);

        const out = [];
        while (is_object(node)) {
            out.push(node.uid);
            if (out.length > limit) {
                out.push('… still going: null was never returned');
                return out;
            }
            node = step(node);
        }
        if (node !== null) {
            out.push(`… ended with ${JSON.stringify(node)} instead of null`);
        }
        return out;
    }

    /* every tree-like node reachable through children, in pre-order, without recursion and without a cycle */
    function nodes_from_tree(root) {
        const out = [];
        const seen = new Set();
        const stack = [root];
        while (stack.length > 0) {
            const node = stack.pop();
            if (!is_tree_like(node) || seen.has(node)) {
                continue;
            }
            seen.add(node);
            out.push(node);
            for (let i = node.children.length - 1; i >= 0; --i) {
                stack.push(node.children[i]);
            }
        }
        return out;
    }

    function is_object(value) {
        return (value !== null) && (typeof value === 'object');
    }

    function is_tree_like(value) {
        return is_object(value) && !Array.isArray(value) && Array.isArray(value.children);
    }

    /* iterative on purpose: one case compares chains 100,000 nodes deep */
    function is_deep_equal(a, b) {
        const pairs = [[a, b]];
        const seen = new Map();
        while (pairs.length > 0) {
            const pair = pairs.pop();
            const left = pair[0];
            const right = pair[1];
            if (left === right) {
                continue;
            }
            if (!is_object(left) || !is_object(right)) {
                if (!is_scalar_equal(left, right)) {
                    return false;
                }
                continue;
            }
            /* a pair already under comparison closes a cycle: it adds nothing new */
            if (seen.get(left) === right) {
                continue;
            }
            if (Array.isArray(left) && Array.isArray(right)) {
                if (!is_array_items_equal(left, right, pairs)) {
                    return false;
                }
                seen.set(left, right);
                continue;
            }
            const keys = Object.keys(left);
            if ((Array.isArray(left) !== Array.isArray(right)) || (keys.length !== Object.keys(right).length)) {
                return false;
            }
            seen.set(left, right);
            for (const key of keys) {
                if (!Object.hasOwn(right, key)) {
                    return false;
                }
                pairs.push([left[key], right[key]]);
            }
        }
        return true;
    }

    /* index by index, the scalars compared at once and the objects left in `pairs`: one case compares arrays of
       10,000,000 numbers, where a key and a pair for each would take seconds and gigabytes; a hole counts as undefined */
    function is_array_items_equal(left, right, pairs) {
        if (left.length !== right.length) {
            return false;
        }
        for (let i = 0, end = left.length; i < end; ++i) {
            const item_left = left[i];
            const item_right = right[i];
            if (item_left === item_right) {
                continue;
            }
            if (is_object(item_left) && is_object(item_right)) {
                pairs.push([item_left, item_right]);
                continue;
            }
            if (!is_scalar_equal(item_left, item_right)) {
                return false;
            }
        }
        return true;
    }

    function is_scalar_equal(a, b) {
        if ((typeof a === 'number') && (typeof b === 'number')) {
            return (Number.isNaN(a) && Number.isNaN(b)) || (Math.abs(a - b) <= NUMBER_TOLERANCE);
        }
        return (typeof a === 'function') && (typeof b === 'function');
    }

    /* a copy that survives postMessage: no functions, no cycles, bounded in size */
    function plain_from_value(value) {
        let budget = PLAIN_BUDGET;

        const path = new Set();
        return item_copy(value, 0);
        function item_copy(item, depth) {
            if (typeof item === 'function') {
                return `[function ${item.name || 'anonymous'}]`;
            }
            if (typeof item === 'undefined') {
                return '[undefined]';
            }
            if ((typeof item === 'symbol') || (item instanceof Error)) {
                return String(item);
            }
            if (typeof item === 'bigint') {
                return `${item}n`;
            }
            if (!is_object(item)) {
                return item;
            }
            if (path.has(item)) {
                return '[circular]';
            }
            budget -= 1;
            if ((depth > PLAIN_DEPTH_LIMIT) || (budget < 0)) {
                return '[…]';
            }
            if ((item instanceof Map) || (item instanceof Set)) {
                return item_copy(Array.from(item), depth);
            }
            path.add(item);
            const copied = Array.isArray(item) ? array_copy(item, depth) : record_copy(item, depth);
            path.delete(item);
            return copied;
        }
        function array_copy(items, depth) {
            const out = [];
            for (const item of items.slice(0, PLAIN_ARRAY_LIMIT)) {
                if (budget < 0) {
                    break;
                }
                out.push(item_copy(item, depth + 1));
            }
            if (out.length < items.length) {
                out.push(`[… ${items.length - out.length} more]`);
            }
            return out;
        }
        function record_copy(record, depth) {
            const out = {};
            for (const key of Object.keys(record)) {
                if (key !== 'parent') {
                    out[key] = item_copy(record[key], depth + 1);
                }
            }
            return out;
        }
    }

    function log_push(...values) {
        if (logs.length >= LOGS_LIMIT) {
            return;
        }
        const parts = values.map(v => (typeof v === 'string') ? v : text_from_log_value(v));
        logs.push(parts.join(' ').slice(0, LOG_TEXT_LIMIT));
    }

    function text_from_log_value(value) {
        try {
            return JSON.stringify(plain_from_value(value));
        }
        catch {
            return String(value);
        }
    }

    function text_from_error(error) {
        return (error && error.message) ? `${error.name}: ${error.message}` : String(error);
    }
}
