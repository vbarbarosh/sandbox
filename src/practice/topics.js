/* The topics of practice.html, from Tree Gym and Tree Lab: a topic is one function to write.

   Each case holds only the args; its expected value comes from the reference solution, `solution`, run on
   the same args, so a new case is its args alone. Four markers stand for args data cannot hold:
   {$fn: "<source>"} is a function, {$make: "chain", size} a chain too deep to write down,
   {$make: "numbers", size, max, seed} an array too long to write down: size whole numbers from 0 to max - 1,
   the same ones for the same seed, and {$make: "table", size, seed, version} a table of size rows
   {id, name, price}, version "before", or "after": the same table with rows gone, changed and new.
   A case of kind "probe" calls the function once on the node `start` of `tree`, its nodes linked to
   their parents; "steps" calls it again and again from that node; "lazy" checks a generator stays lazy.
   `observe` says what of a call is compared: "result" the value returned, "node" the uid of the node
   returned, "edit" the value returned and the tree after the call, "iterable" the uids yielded,
   "parents" where each parent link points, "geometry" the x and y of each node. `check` adds a rule a
   result equal to the expected one can still break; `is_pure` says the args must stay untouched. `time_limit_ms`,
   when a topic has it, is how long the attempt on one case may run, once its reference has, in place of 4 s.
   `explanation` says how it is solved: `approach` in paragraphs split by a blank line, `example` the input example
   traced, `cost` in time and memory, `pitfalls` the usual mistakes; `sources` are pages to read more, {title, url}.
   A string in `input.example` is shown as it is written: a string param carries its own quotes there. */
const PRACTICE_GROUPS = ['Fundamentals', 'Walks', 'Search', 'Transformations', 'Editing in place', 'Tree and flat data', 'Parent links', 'Binary trees', 'Binary traversal', 'File systems', 'AVL trees', 'Red-black trees', 'B-trees', 'Arrays'];

const PRACTICE_TOPICS = [
    {
        uid: 'count-the-nodes',
        group: 'Fundamentals',
        level: 1,
        title: 'Count the nodes',
        fn: 'count_nodes',
        params: ['root'],
        signature: 'function count_nodes(root)',
        brief: 'Return the total number of nodes in the tree, including the root.',
        rules: ['Each node has a numeric value and a children array. An empty tree is null and has 0 nodes.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'A tree is a node with smaller trees under it: each child is the root of a subtree. So the count of a tree is 1, for its root, plus the counts of the subtrees of its children, and each of those is counted the same way, down to the leaves, which have no children and count 1.\n\nWritten as code, the function calls itself on each child and adds up what comes back. The empty tree, `null`, is the one tree with no node: it counts 0, and it is where the function stops when the root itself is `null`.',
            example: 'The root 5 has two children, 2 and 8, both leaves. count_nodes(2) is 1 with no children to add, and so is count_nodes(8); count_nodes(5) is 1 + 1 + 1 = 3.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack, h the height of the tree: up to n on a chain, where a very deep tree overflows the stack and a loop over an explicit stack of nodes is needed instead.',
            pitfalls: [
                'Reading `root.children` before checking for `null` throws on the empty tree.',
                'Adding up the children’s counts without the 1 for the node itself gives 0 for every tree.',
            ],
        },
        sources: [
            {title: 'Tree (data structure), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)'},
            {title: 'Recursion (computer science), Wikipedia', url: 'https://en.wikipedia.org/wiki/Recursion_(computer_science)'},
        ],
        hints: ['Count the current node as 1, then add the counts of its children.', 'A tree is a node plus smaller trees. Its count is 1 plus the counts of the subtrees under it.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function count_nodes(root)
{
    if (root === null) {
        return 0;
    }
    let out = 1;
    for (const child of root.children) {
        out += count_nodes(child);
    }
    return out;
}`,
        solution_php: `<?php

function count_nodes($root)
{
    if ($root === null) {
        return 0;
    }
    $out = 1;
    foreach ($root->children as $child) {
        $out += count_nodes($child);
    }
    return $out;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Single node', args: [{value: 0, children: []}]},
            {label: 'Deep branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Six siblings', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'All values are zero', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}]},
            {label: 'Uneven branches', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'A single node', args: [{value: 1, children: []}]},
            {label: 'A chain', args: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}]},
            {label: 'One parent, five leaves', args: [{value: 13, children: [{value: 14, children: []}, {value: 15, children: []}, {value: 16, children: []}, {value: 17, children: []}, {value: 18, children: []}]}]},
            {label: 'A lopsided tree', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: -14, children: [{value: 92, children: [{value: -20, children: [{value: 58, children: [{value: 26, children: [{value: 32, children: []}, {value: 88, children: []}]}]}, {value: -7, children: [{value: 96, children: []}]}, {value: 8, children: []}]}, {value: 71, children: [{value: 23, children: []}]}, {value: 21, children: []}]}, {value: -35, children: [{value: -39, children: []}, {value: -49, children: [{value: 47, children: []}, {value: -14, children: [{value: 13, children: []}]}]}, {value: 41, children: [{value: -25, children: [{value: 27, children: [{value: 98, children: []}]}, {value: -13, children: []}]}, {value: 86, children: []}]}, {value: -4, children: [{value: 28, children: [{value: -12, children: []}]}, {value: 73, children: []}]}]}, {value: -43, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'sum-the-values',
        group: 'Fundamentals',
        level: 1,
        title: 'Sum the values',
        fn: 'sum_values',
        params: ['root'],
        signature: 'function sum_values(root)',
        brief: 'Return the sum of every node’s numeric value.',
        rules: ['Values can be negative, zero, or repeated. Return 0 for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'This is Count the nodes with one change: each node adds its `value` instead of 1. The sum of a tree is the `value` of its root plus the sums of the subtrees of its children, and each of those is summed the same way, down to the leaves, whose sum is their own `value`. A function that follows the shape of the data like this, one call per node combining its own part with what its children return, is called structural recursion.\n\nIn code, start the total at `root.value` and add what the function returns for each child. The empty tree, `null`, sums to 0, the one number that changes nothing in a sum. Negative values, zeros and repeats need no special case: each node is added exactly once, whatever it holds, so 3 and −3 cancel and two 4s add up to 8.',
            example: 'The root 5 has the leaves 2 and 8. sum_values(2) is 2, with no children to add, and sum_values(8) is 8; sum_values(5) starts from 5 and adds them: 5 + 2 + 8 = 15.',
            cost: 'Time O(n): each node is visited once and adds one number. Memory O(h) for the calls waiting on the stack, h the height: up to n on a chain, where a very deep tree overflows the stack (Walk without recursion shows the way around it).',
            pitfalls: [
                'Starting the total at 0 and adding only the children’s sums drops the `value` of every node: leaves return 0, and so does every tree.',
                'Keeping the 1 of Count the nodes anywhere, say for a leaf, mixes a count into the sum: a leaf adds its `value`, not 1.',
                'Leaving out negative values or repeats, say with a Set of the values seen, breaks the cases where values cancel or repeat: every node adds its `value` once, whatever it is.',
            ],
        },
        sources: [
            {title: 'Recursion (computer science): structural recursion, Wikipedia', url: 'https://en.wikipedia.org/wiki/Recursion_(computer_science)#Recursive_data_structures_(structural_recursion)'},
            {title: 'Tree traversal: arbitrary trees, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Arbitrary_trees'},
        ],
        hints: ['The count exercise gave each node a contribution of 1. What should each node contribute here?'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function sum_values(root)
{
    if (root === null) {
        return 0;
    }
    let out = root.value;
    for (const child of root.children) {
        out += sum_values(child);
    }
    return out;
}`,
        solution_php: `<?php

function sum_values($root)
{
    if ($root === null) {
        return 0;
    }
    $out = $root->value;
    foreach ($root->children as $child) {
        $out += sum_values($child);
    }
    return $out;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Negative values', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'One negative node', args: [{value: -3, children: []}]},
            {label: 'Positive and negative cancel', args: [{value: 2, children: [{value: -7, children: []}, {value: 5, children: []}]}]},
            {label: 'Repeated contributions', args: [{value: 3, children: [{value: 3, children: []}, {value: 3, children: [{value: 3, children: []}, {value: 3, children: []}]}]}]},
            {label: 'Fractional values', args: [{value: 1.5, children: [{value: 2, children: []}, {value: -0.75, children: []}]}]},
            {label: 'Thirty nodes, generated', args: [{value: 83, children: [{value: 8, children: [{value: 95, children: [{value: 56, children: [{value: 42, children: []}, {value: -44, children: [{value: -25, children: []}]}, {value: -19, children: []}]}, {value: -45, children: []}, {value: -12, children: [{value: 84, children: []}]}, {value: 68, children: [{value: 36, children: []}]}]}, {value: 94, children: [{value: 87, children: [{value: -40, children: []}, {value: -47, children: []}]}, {value: 93, children: []}, {value: 7, children: [{value: -37, children: []}]}]}, {value: -47, children: []}]}, {value: 87, children: [{value: -37, children: [{value: 53, children: []}]}, {value: -4, children: []}]}, {value: 28, children: [{value: 1, children: [{value: 97, children: []}]}]}, {value: -45, children: []}, {value: 8, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'count-the-leaves',
        group: 'Fundamentals',
        level: 1,
        title: 'Count the leaves',
        fn: 'count_leaves',
        params: ['root'],
        signature: 'function count_leaves(root)',
        brief: 'Return the number of nodes with no children.',
        rules: ['A tree with just a root has one leaf. An empty tree has zero leaves.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'A leaf is a node whose `children` array is empty. The leaves of a tree are the leaves of its children’s subtrees put together, so the count of a node with children is the sum of its children’s counts, and the node itself adds nothing. Only a leaf adds 1: it is a tree of one node, and that node is its only leaf.\n\nSo the function has two base cases, two places where it stops without recursing: the empty tree, `null`, gives 0, and a leaf gives 1. Every other node returns the sum over its children. A tree that is a single root has one leaf, the root itself, and the leaf case covers it without a rule of its own.',
            example: 'The root 5 has children, so it is not a leaf and only adds up what they return. count_leaves(2) is 1, since 2 has no children, and so is count_leaves(8). count_leaves(5) is 1 + 1 = 2.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack, h the height of the tree: a chain of n nodes is n calls deep for its single leaf.',
            pitfalls: [
                'Testing for a leaf with `!root.children` never succeeds: an empty array is truthy in JavaScript. Check `root.children.length === 0`.',
                'Without the leaf case nothing ever adds 1, and the function returns 0 for every tree.',
                'Adding 1 for every node, as in Count the nodes, counts the inner nodes too: 3 for the example instead of 2.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'Recursion (computer science): base case, Wikipedia', url: 'https://en.wikipedia.org/wiki/Recursion_(computer_science)#Base_case'},
        ],
        hints: ['Check whether the children array is empty before recursing.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function count_leaves(root)
{
    if (root === null) {
        return 0;
    }
    if (root.children.length === 0) {
        return 1;
    }
    let out = 0;
    for (const child of root.children) {
        out += count_leaves(child);
    }
    return out;
}`,
        solution_php: `<?php

function count_leaves($root)
{
    if ($root === null) {
        return 0;
    }
    if (count($root->children) === 0) {
        return 1;
    }
    $out = 0;
    foreach ($root->children as $child) {
        $out += count_leaves($child);
    }
    return $out;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Deep branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Single node', args: [{value: 42, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Six sibling leaves', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Repeated leaf values', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}]},
            {label: 'Leaves at three depths', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: -1, children: [{value: -29, children: [{value: 9, children: [{value: -11, children: []}, {value: -2, children: []}, {value: 82, children: [{value: 54, children: [{value: 2, children: []}]}, {value: -41, children: []}]}]}, {value: -12, children: [{value: 67, children: [{value: 70, children: []}]}]}]}, {value: 91, children: [{value: 14, children: []}, {value: 93, children: [{value: 34, children: [{value: -29, children: []}, {value: -13, children: []}, {value: 5, children: []}]}, {value: -36, children: []}, {value: -11, children: []}, {value: -29, children: []}]}]}, {value: 48, children: [{value: 22, children: []}]}, {value: 38, children: [{value: 26, children: [{value: 80, children: []}]}, {value: 37, children: []}]}, {value: 84, children: []}, {value: 4, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'measure-tree-height',
        group: 'Fundamentals',
        level: 1,
        title: 'Measure tree height',
        fn: 'tree_height',
        params: ['root'],
        signature: 'function tree_height(root)',
        brief: 'Return the number of nodes on the longest path from the root to a leaf.',
        rules: ['Count the root in the height. A single node has height 1 and an empty tree has height 0.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The height here is the number of nodes on the longest path from the root down to a leaf. Any such path starts at the root and goes on into exactly one child’s subtree, and the longest one goes into the tallest subtree. So the height of a tree is 1, for the root, plus the greatest height among the subtrees of its children.\n\nIn code, ask each child for its height, keep the largest, starting from 0, and add 1. A leaf has no children, so the largest stays 0 and the leaf’s height is 1; the empty tree, `null`, has height 0. A node can answer only after all its children have, so the work is done on the way back up: a postorder computation.\n\nWikipedia counts height in edges, one less than here: 0 for a single node, −1 for the empty tree. This topic counts nodes, as its rules say.',
            example: 'The root 5 has the leaves 2 and 8. tree_height(2) is 0 + 1 = 1, since 2 has no children, and tree_height(8) is 1 the same way. The larger of the two is 1, so tree_height(5) is 1 + 1 = 2: the path 5 → 2 holds two nodes.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack: on a chain h is n, and the recursion is exactly as deep as the answer.',
            pitfalls: [
                'Adding up the children’s heights instead of taking the largest gives 1 + 1 + 1 = 3 for the example, where the height is 2.',
                '`Math.max(...root.children.map(tree_height))` is `Math.max()` on a leaf, which is `-Infinity`: start the largest at 0, or the leaf’s height comes out as `-Infinity`.',
                'Counting edges, as many textbooks do, gives 1 for the example and 0 for a single node: the rules count nodes.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'Tree traversal: post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
        ],
        hints: ['Compute the height of each child subtree and add 1 to the largest.', 'Keep the largest `tree_height(child)` over the children, starting from 0, and add 1.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function tree_height(root)
{
    if (root === null) {
        return 0;
    }
    let greatest = 0;
    for (const child of root.children) {
        greatest = Math.max(greatest, tree_height(child));
    }
    return greatest + 1;
}`,
        solution_php: `<?php

function tree_height($root)
{
    if ($root === null) {
        return 0;
    }
    $greatest = 0;
    foreach ($root->children as $child) {
        $greatest = max($greatest, tree_height($child));
    }
    return $greatest + 1;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Deep branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Wide tree', args: [{value: 0, children: [{value: 1, children: []}, {value: 2, children: []}, {value: 3, children: []}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Single node', args: [{value: 0, children: []}]},
            {label: 'Deepest branch is in the middle', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Many nodes at one depth', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'A single node', args: [{value: 1, children: []}]},
            {label: 'A chain', args: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}]},
            {label: 'One parent, five leaves', args: [{value: 13, children: [{value: 14, children: []}, {value: 15, children: []}, {value: 16, children: []}, {value: 17, children: []}, {value: 18, children: []}]}]},
            {label: 'A lopsided tree', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: 38, children: [{value: 84, children: [{value: -35, children: []}]}, {value: -11, children: [{value: 6, children: [{value: 46, children: [{value: 77, children: []}, {value: 13, children: []}]}, {value: -48, children: []}]}, {value: 1, children: [{value: 26, children: []}]}, {value: 54, children: [{value: -20, children: [{value: 4, children: [{value: 29, children: []}]}]}, {value: -25, children: [{value: -32, children: []}]}]}, {value: 92, children: []}]}, {value: 43, children: [{value: -41, children: [{value: 37, children: []}, {value: 14, children: [{value: 62, children: []}]}]}]}, {value: -27, children: [{value: 69, children: []}]}, {value: 98, children: [{value: -5, children: []}]}, {value: 44, children: [{value: 58, children: []}]}, {value: -8, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'count-nodes-at-a-depth',
        group: 'Fundamentals',
        level: 1,
        title: 'Count nodes at a depth',
        fn: 'tree_count_at_depth',
        params: ['root', 'depth'],
        signature: 'function tree_count_at_depth(root, depth)',
        brief: 'Return the number of nodes exactly depth edges from the root.',
        rules: ['The root is at depth 0. Return 0 for an empty tree, a missing level, or a depth that is negative or fractional.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, depth: 1}},
        explanation: {
            approach: 'The depth of a node is the number of edges from the root down to it: the root is at depth 0, its children at depth 1. A node at depth d in the whole tree is at depth d − 1 in the subtree of the child it lies under. So the count at depth d is the sum, over the root’s children, of the counts at depth d − 1 in their subtrees.\n\nIn code, carry the remaining depth down: each call on a child passes `depth - 1`. When the remaining depth is 0, the current node is one of those wanted: return 1 and go no deeper. A branch that ends before that, a leaf with depth still left, adds 0, since it has no children to ask.\n\nA negative or fractional `depth` matches no level, so return 0 for it at once; the empty tree, `null`, returns 0 too.',
            example: 'The example gives the tree; take `depth` 1. At 5 the remaining depth is 1, not 0, so it asks both children with depth 0. 2 is at remaining depth 0 and returns 1, and so does 8: the result is 1 + 1 = 2. With `depth` 0 only the root counts, 1; with `depth` 2 the leaves 2 and 8 have no children to ask, and the result is 0.',
            cost: 'Time O(n) at worst: only the nodes down to the wanted depth are visited, each once, and nothing below it. Memory O(min(h, depth)) for the calls waiting on the stack.',
            pitfalls: [
                'Stopping at `depth <= 0` instead of at exactly 0 counts the root for a negative depth and every child of the root for a depth of 0.5: the rules want 0 for both.',
                'Counting the root as depth 1, the way Measure tree height counts nodes, shifts every answer by one level: depth counts edges.',
                'Reading `root.children` before the check for `null` throws on the empty tree.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'Tree traversal: arbitrary trees, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Arbitrary_trees'},
        ],
        hints: ['Stop descending when the remaining depth is zero.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_count_at_depth(root, depth)
{
    if ((root === null) || !Number.isInteger(depth) || (depth < 0)) {
        return 0;
    }
    if (depth === 0) {
        return 1;
    }
    let out = 0;
    for (const child of root.children) {
        out += tree_count_at_depth(child, depth - 1);
    }
    return out;
}`,
        solution_php: `<?php

function tree_count_at_depth($root, $depth)
{
    if (($root === null) || !is_int($depth) || ($depth < 0)) {
        return 0;
    }
    if ($depth === 0) {
        return 1;
    }
    $out = 0;
    foreach ($root->children as $child) {
        $out += tree_count_at_depth($child, $depth - 1);
    }
    return $out;
}`,
        cases: [
            {label: 'Three nodes two edges from the root', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 2]},
            {label: 'The root is at depth zero', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 0]},
            {label: 'Wide first level', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}, 1]},
            {label: 'Missing level', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}, 2]},
            {label: 'Empty tree', args: [null, 0]},
            {label: 'Negative depth', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, -1]},
            {label: 'Fractional depth', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, 1.5]},
            {label: 'Depth 3 of thirty generated nodes', args: [{value: -45, children: [{value: 11, children: [{value: 23, children: [{value: 7, children: []}, {value: -5, children: [{value: 96, children: [{value: 0, children: [{value: -32, children: [{value: 26, children: []}]}]}]}]}]}]}, {value: 43, children: [{value: 83, children: []}, {value: 58, children: []}]}, {value: 33, children: [{value: 59, children: [{value: 49, children: [{value: 57, children: [{value: 94, children: [{value: -30, children: []}]}, {value: 73, children: []}]}, {value: 7, children: [{value: 60, children: []}]}, {value: 65, children: []}]}, {value: 79, children: [{value: 26, children: [{value: 25, children: [{value: 31, children: []}]}]}]}, {value: -33, children: []}]}]}, {value: 26, children: []}, {value: -17, children: [{value: 30, children: []}]}]}, 3]},
            {label: 'Deeper than the chain', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}, 60]},
        ],
    },
    {
        uid: 'count-internal-nodes',
        group: 'Fundamentals',
        level: 1,
        title: 'Count internal nodes',
        fn: 'tree_count_internal_nodes',
        params: ['root'],
        signature: 'function tree_count_internal_nodes(root)',
        brief: 'Count nodes that have at least one child.',
        rules: ['A leaf contributes 0. An empty tree returns 0.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'An internal node is one with at least one child; every node is either internal or a leaf. So this is Count the nodes with a condition: a node adds 1 when its `children` array is not empty and 0 when it is, and the internal nodes of a tree are those of its root plus those of its children’s subtrees.\n\nIn code, the empty tree, `null`, and a leaf are where the function stops: both return 0. Any other node returns 1 plus what the function returns for each child. Since every node is either a leaf or internal, the answer is also the count of nodes minus the count of leaves, a handy way to check it.',
            example: 'The root 5 has two children, so it is internal and adds 1. Its children 2 and 8 are leaves and return 0 each. tree_count_internal_nodes(5) is 1 + 0 + 0 = 1: 3 nodes minus 2 leaves.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack: a chain of n nodes has n − 1 internal nodes and is n calls deep.',
            pitfalls: [
                'Giving every node 1 and forgetting that a leaf adds 0 returns the count of all nodes: 3 for the example instead of 1.',
                'Testing `root.children` for truthiness never sees a leaf: an empty array is truthy, so check its `length`.',
                'A tree of a single node has no internal node: its root is a leaf and gives 0.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'General trees: definitions and terminology, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/GenTreeIntro.html#general-tree-definitions-and-terminology'},
        ],
        hints: ['Decide whether the current node contributes before looking at its children.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_count_internal_nodes(root)
{
    if ((root === null) || (root.children.length === 0)) {
        return 0;
    }
    let out = 1;
    for (const child of root.children) {
        out += tree_count_internal_nodes(child);
    }
    return out;
}`,
        solution_php: `<?php

function tree_count_internal_nodes($root)
{
    if (($root === null) || (count($root->children) === 0)) {
        return 0;
    }
    $out = 1;
    foreach ($root->children as $child) {
        $out += tree_count_internal_nodes($child);
    }
    return $out;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Chain', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Wide tree', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Leaf only', args: [{value: 9, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 32, children: [{value: 77, children: [{value: 56, children: [{value: 41, children: [{value: 7, children: [{value: 63, children: [{value: 78, children: []}, {value: 87, children: []}]}, {value: -17, children: [{value: -20, children: [{value: 96, children: [{value: -27, children: [{value: 30, children: []}]}]}]}]}, {value: 24, children: []}, {value: 94, children: [{value: 20, children: []}]}]}, {value: 4, children: []}]}, {value: 71, children: []}]}, {value: 61, children: []}]}, {value: 3, children: [{value: 57, children: [{value: -33, children: [{value: 99, children: []}]}]}, {value: 11, children: []}]}, {value: 94, children: [{value: 17, children: [{value: 64, children: []}, {value: 3, children: [{value: 0, children: []}]}]}]}, {value: -4, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'measure-the-width-of-each-level',
        group: 'Fundamentals',
        level: 1,
        title: 'Measure the width of each level',
        fn: 'tree_list_level_widths',
        params: ['root'],
        signature: 'function tree_list_level_widths(root)',
        brief: 'Return an array containing the number of nodes at each depth, starting at the root.',
        rules: ['Count existing nodes. Return an empty array for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The width of a level is the number of nodes at that depth, and the answer lists the widths, depth 0 first. One walk over the tree can count them all, as long as each node knows its depth: the root is at depth 0, and the children of a node at depth d are at depth d + 1.\n\nSo walk in preorder with the depth as a second argument, and keep one array of counters, `out`, indexed by depth. At each node add 1 to `out[depth]`, starting the counter at 0 the first time that depth comes up. The order of the walk does not matter, since each node lands in the counter of its own depth. No depth is skipped either: a node at depth d is reached through a node at d − 1, so the array has no holes, and its length is the height of the tree.\n\nA breadth-first walk, which takes the tree one level at a time, gives the same array: each width is the size of one level.',
            example: 'The walk starts at 5 with depth 0: out[0] becomes 1. The child 2 is at depth 1: out[1] becomes 1. The child 8 is at depth 1 too: out[1] becomes 2. Neither has children, and the result is [1, 2].',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack and for the h counters of the result.',
            pitfalls: [
                '`out[depth] += 1` on a depth not seen yet gives `NaN`, since `undefined + 1` is `NaN`: start each counter at 0 first.',
                'A depth kept in one shared variable, incremented on the way down and never decremented, puts every later sibling a level too deep; passed as an argument, it comes back by itself when the call returns.',
                'The empty tree has no levels: the rules want `[]`, not `[0]`.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'Tree traversal: breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search'},
        ],
        hints: ['Pass the current depth to your recursive call.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_list_level_widths(root)
{
    const out = [];
    if (root !== null) {
        visit(root, 0);
    }
    return out;
    function visit(current, depth) {
        out[depth] = (out[depth] ?? 0) + 1;
        for (const child of current.children) {
            visit(child, depth + 1);
        }
    }
}`,
        solution_php: `<?php

function tree_list_level_widths($root)
{
    $out = [];
    if ($root !== null) {
        tree_list_level_widths_visit($root, 0, $out);
    }
    return $out;
}

function tree_list_level_widths_visit($current, $depth, &$out)
{
    $out[$depth] = ($out[$depth] ?? 0) + 1;
    foreach ($current->children as $child) {
        tree_list_level_widths_visit($child, $depth + 1, $out);
    }
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Chain', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Six children', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Single node', args: [{value: 0, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 19, children: [{value: -4, children: [{value: 93, children: []}, {value: -31, children: [{value: 90, children: [{value: 88, children: [{value: -17, children: [{value: 92, children: []}, {value: 61, children: []}]}, {value: 41, children: []}]}]}]}]}, {value: 23, children: [{value: 2, children: [{value: 76, children: [{value: 63, children: [{value: -33, children: [{value: 31, children: []}]}, {value: 60, children: [{value: 93, children: []}]}, {value: -40, children: []}, {value: 53, children: []}]}, {value: 99, children: []}, {value: 4, children: []}, {value: 45, children: []}]}, {value: 65, children: []}, {value: 18, children: []}]}, {value: 35, children: []}]}, {value: -18, children: []}, {value: 77, children: [{value: 63, children: [{value: 90, children: []}]}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'preorder-depth-first',
        group: 'Walks',
        level: 1,
        title: 'Preorder depth-first',
        fn: 'preorder',
        params: ['root'],
        signature: 'function preorder(root)',
        brief: 'Return an array of values in preorder. Visit the node, then traverse each of its child subtrees from left to right.',
        rules: ['Keep duplicate values and return an empty array for a null root.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'Preorder visits a node before any of its descendants: the node itself first, then the whole subtree of its first child, then the whole subtree of the second, and so on, left to right. It is a depth-first walk: it follows one branch all the way down before it moves on to the next sibling. In other words, the preorder of a tree is the root’s value followed by the preorders of its children’s subtrees, one after another.\n\nIn code, a helper `visit(current)` pushes `current.value` into one array shared by the whole walk, then calls itself on each child in turn. The call stack keeps the place: when a child’s subtree is done, its call returns, and the loop moves on to the next sibling. The empty tree, `null`, gives an empty array.\n\nPreorder lists every parent before its children: the order of a table of contents, or of copying a tree, where a node must exist before anything is hung under it.',
            example: 'visit(5) pushes 5, then loops over its children. visit(2) pushes 2 and returns, since 2 has no children; visit(8) pushes 8 and returns. The result is [5, 2, 8].',
            cost: 'Time O(n): each node is visited and pushed once. Memory O(n) for the result, plus O(h) for the calls waiting on the stack; a very deep chain overflows it, which Walk without recursion fixes.',
            pitfalls: [
                'Returning a new array from every call and joining them with `concat` or spread copies each value again at every level above it: O(n × h) instead of O(n), slow on a deep chain.',
                'Pushing the value after the loop over the children gives postorder: [2, 8, 5] for the example.',
                'Sorting the children, or dropping repeated values, loses the given order: the `children` array is already left to right, and duplicates stay.',
            ],
        },
        sources: [
            {title: 'Tree traversal: pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'General tree traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/GenTreeIntro.html#general-tree-traversals'},
            {title: 'Depth-first search, cp-algorithms', url: 'https://cp-algorithms.com/graph/depth-first-search.html'},
        ],
        hints: ['Use one results array and push each value before the recursive calls.', 'Keep one result array for the whole walk: declare it outside the recursive helper, so arrays are not joined at every level.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function preorder(root)
{
    const out = [];
    function visit(current) {
        out.push(current.value);
        for (const child of current.children) {
            visit(child);
        }
    }
    if (root !== null) {
        visit(root);
    }
    return out;
}`,
        solution_php: `<?php

function preorder($root)
{
    $out = [];
    if ($root !== null) {
        preorder_visit($root, $out);
    }
    return $out;
}

function preorder_visit($current, &$out)
{
    $out[] = $current->value;
    foreach ($current->children as $child) {
        preorder_visit($child, $out);
    }
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Duplicate values', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Deep branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Deep subtree before next sibling', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Sibling order is unsorted', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Only the root', args: [{value: 0, children: []}]},
            {label: 'A single node', args: [{value: 1, children: []}]},
            {label: 'A chain', args: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}]},
            {label: 'One parent, five leaves', args: [{value: 13, children: [{value: 14, children: []}, {value: 15, children: []}, {value: 16, children: []}, {value: 17, children: []}, {value: 18, children: []}]}]},
            {label: 'A lopsided tree', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: -4, children: [{value: -35, children: [{value: -8, children: [{value: 95, children: []}]}]}, {value: 88, children: [{value: 30, children: [{value: 18, children: []}]}, {value: -10, children: []}]}, {value: 10, children: [{value: -43, children: [{value: -48, children: []}, {value: 59, children: [{value: -22, children: [{value: -30, children: []}]}, {value: 17, children: [{value: 21, children: []}, {value: 2, children: []}, {value: 30, children: [{value: 21, children: []}]}]}]}, {value: -8, children: []}, {value: 75, children: [{value: 37, children: [{value: -20, children: [{value: 30, children: []}]}]}]}]}, {value: -25, children: []}]}, {value: 8, children: [{value: 78, children: [{value: 41, children: []}, {value: 13, children: []}]}, {value: -14, children: []}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'postorder-depth-first',
        group: 'Walks',
        level: 1,
        title: 'Postorder depth-first',
        fn: 'tree_traverse_postorder',
        params: ['root'],
        signature: 'function tree_traverse_postorder(root)',
        brief: 'Return the node values in postorder. Visit every child subtree from left to right, then visit the node.',
        rules: ['Keep repeated values. Return an empty array for a null root.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'Postorder visits a node after all of its descendants: the whole subtree of its first child, then that of the second, and so on, left to right, and the node itself last. It is the same depth-first walk as preorder; only the moment of the visit moves, from before the loop over the children to after it. The postorder of a tree is the postorders of its children’s subtrees, one after another, followed by the root’s value.\n\nIn code, a helper `visit(current)` first calls itself on each child, then pushes `current.value` into one shared array. Each value is pushed only when its whole subtree is done, so the root always comes last and a leaf comes as soon as the walk reaches it. The empty tree, `null`, gives an empty array.\n\nThis is the order in which a parent can use what its children have computed: the size of a folder from its files, the height of a tree, deleting a tree from the leaves up.',
            example: 'visit(5) first loops over its children. visit(2) has no children to visit, so it pushes 2 and returns; visit(8) pushes 8 the same way. Back in visit(5), the loop is over and it pushes 5. The result is [2, 8, 5].',
            cost: 'Time O(n): each node is visited and pushed once. Memory O(n) for the result, plus O(h) for the calls waiting on the stack, up to n on a chain.',
            pitfalls: [
                'Reversing a preorder is not postorder: the preorder [5, 2, 8] reversed is [8, 2, 5], with the siblings swapped. It is the right-to-left preorder, [5, 8, 2], that reverses into postorder.',
                'Pushing the value before the loop over the children gives preorder: [5, 2, 8] for the example.',
                'Returning a new array from every call and joining them copies each value again at every level above it: O(n × h), slow on a deep chain.',
            ],
        },
        sources: [
            {title: 'Tree traversal: post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'General tree traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/GenTreeIntro.html#general-tree-traversals'},
        ],
        hints: ['Change when you append a value compared with preorder traversal.', 'It is the same walk as preorder. Only the moment you push the value moves: after the loop over the children. The root always comes last.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function tree_traverse_postorder(root)
{
    const out = [];
    if (root !== null) {
        visit(root);
    }
    return out;
    function visit(current) {
        for (const child of current.children) {
            visit(child);
        }
        out.push(current.value);
    }
}`,
        solution_php: `<?php

function tree_traverse_postorder($root)
{
    $out = [];
    if ($root !== null) {
        tree_traverse_postorder_visit($root, $out);
    }
    return $out;
}

function tree_traverse_postorder_visit($current, &$out)
{
    foreach ($current->children as $child) {
        tree_traverse_postorder_visit($child, $out);
    }
    $out[] = $current->value;
}`,
        cases: [
            {label: 'Mixed branch depths', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Sibling order stays intact', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Repeat the zero values', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}]},
            {label: 'Read a chain from the leaf up', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Single leaf', args: [{value: -3, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'A single node', args: [{value: 1, children: []}]},
            {label: 'A chain', args: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}]},
            {label: 'One parent, five leaves', args: [{value: 13, children: [{value: 14, children: []}, {value: 15, children: []}, {value: 16, children: []}, {value: 17, children: []}, {value: 18, children: []}]}]},
            {label: 'A lopsided tree', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: 99, children: [{value: 74, children: [{value: -19, children: [{value: -44, children: [{value: -18, children: []}]}, {value: 55, children: [{value: 47, children: []}, {value: 74, children: [{value: 90, children: []}]}]}, {value: 33, children: []}]}]}, {value: 54, children: [{value: 83, children: []}, {value: -8, children: [{value: 65, children: [{value: -27, children: []}]}]}, {value: 19, children: []}]}, {value: 41, children: [{value: -10, children: [{value: -11, children: [{value: 94, children: []}, {value: 44, children: []}]}]}, {value: 57, children: []}, {value: 11, children: [{value: 19, children: []}, {value: 67, children: []}]}, {value: 38, children: []}]}, {value: 1, children: []}, {value: -31, children: [{value: -20, children: []}]}, {value: -17, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'right-to-left-preorder',
        group: 'Walks',
        level: 1,
        title: 'Right-to-left preorder',
        fn: 'tree_traverse_reverse_preorder',
        params: ['root'],
        signature: 'function tree_traverse_reverse_preorder(root)',
        brief: 'Visit each node before its children and explore siblings from right to left.',
        rules: ['Keep duplicate values. Return [] for an empty tree. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'This is preorder with the siblings taken in the opposite order: the node first, then the subtree of its last child, then the one before it, down to the first child. Each subtree is still finished before the walk moves on to the next sibling; only the direction across the siblings changes, at every level. Wikipedia calls it reverse pre-order, NRL: node, right, left.\n\nIn code it is the preorder helper with the loop over `current.children` run backward, from index `length - 1` down to 0. Reversing the children would do the same, but `reverse()` changes the tree, which the rules forbid, and a reversed copy costs a new array at every node; an index that counts down needs neither.\n\nThis walk is the mirror image of postorder: read backward, it is exactly the postorder of the same tree.',
            example: 'visit(5) pushes 5, then loops from the last child to the first: visit(8) pushes 8, then visit(2) pushes 2. The result is [5, 8, 2]. Read backward, [2, 8, 5], it is the postorder of the tree.',
            cost: 'Time O(n): each node is visited and pushed once. Memory O(n) for the result, plus O(h) for the calls waiting on the stack.',
            pitfalls: [
                '`current.children.reverse()` reverses the tree’s own array: the input changes, which the rules forbid and the tests check.',
                'Reversing the whole preorder instead puts each node after its children: [8, 2, 5] for the example, not [5, 8, 2].',
                'Reversing only the root’s children leaves every deeper level left to right: the walk goes right to left at every node.',
            ],
        },
        sources: [
            {title: 'Tree traversal: reverse pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL'},
            {title: 'Tree traversal: arbitrary trees, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Arbitrary_trees'},
        ],
        hints: ['Reverse your loop order over the children.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_traverse_reverse_preorder(root)
{
    const out = [];
    if (root !== null) {
        visit(root);
    }
    return out;
    function visit(current) {
        out.push(current.value);
        for (let i = current.children.length - 1; i >= 0; --i) {
            visit(current.children[i]);
        }
    }
}`,
        solution_php: `<?php

function tree_traverse_reverse_preorder($root)
{
    $out = [];
    if ($root !== null) {
        tree_traverse_reverse_preorder_visit($root, $out);
    }
    return $out;
}

function tree_traverse_reverse_preorder_visit($current, &$out)
{
    $out[] = $current->value;
    for ($i = count($current->children) - 1; $i >= 0; --$i) {
        tree_traverse_reverse_preorder_visit($current->children[$i], $out);
    }
}`,
        cases: [
            {label: 'Reverse siblings at every level', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Wide tree', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Chain order stays the same', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 26, children: [{value: 86, children: [{value: 79, children: [{value: -49, children: [{value: -28, children: []}]}, {value: -17, children: [{value: 68, children: []}, {value: -11, children: []}]}]}, {value: -31, children: [{value: -36, children: []}, {value: 13, children: []}]}]}, {value: -6, children: [{value: -30, children: [{value: 0, children: [{value: 51, children: [{value: 44, children: [{value: -19, children: []}]}]}, {value: -5, children: [{value: -35, children: []}]}]}]}]}, {value: 61, children: [{value: -39, children: []}]}, {value: -13, children: [{value: 62, children: [{value: -21, children: []}, {value: 22, children: [{value: 58, children: []}]}]}, {value: 50, children: [{value: -42, children: [{value: -31, children: []}, {value: -30, children: []}]}]}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'bottom-up-level-order',
        group: 'Walks',
        level: 1,
        title: 'Bottom-up level order',
        fn: 'tree_traverse_bottom_up',
        params: ['root'],
        signature: 'function tree_traverse_bottom_up(root)',
        brief: 'Return one array per level, deepest level first.',
        rules: ['Preserve left-to-right order within every level. Return [] for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The answer is the tree’s levels, one array of values per depth, deepest level first, each level read left to right. Collect the levels in the usual order first, the root’s level at index 0, then reverse the outer array: that flips the order of the levels, not the order inside each. The reversal comes last because the deepest level is not known until the walk is over.\n\nTo collect them, walk in preorder with the depth as a second argument and push each value into `levels[depth]`, making that array the first time the depth comes up. Each level comes out left to right: preorder finishes a node’s subtree before the next sibling’s, so of two nodes at the same depth the one on the left is always met first. A breadth-first walk with a queue, one level at a time, gives the same levels.',
            example: 'The walk starts at 5 with depth 0: levels[0] is [5]. The children are at depth 1: 2 makes levels[1] = [2], and 8 is pushed into it: [2, 8]. The levels are [[5], [2, 8]]; reversed, the result is [[2, 8], [5]].',
            cost: 'Time O(n): each node is visited once, and the reversal moves h arrays. Memory O(n) for the result, plus O(h) for the calls waiting on the stack.',
            pitfalls: [
                'Reversing the inner arrays too reads each level right to left: [[8, 2], [5]] for the example instead of [[2, 8], [5]].',
                '`levels[depth].push(value)` before that level exists throws, since `undefined` has no `push`: make each level the first time its depth comes up.',
                'The empty tree has no levels: the rules want `[]`, not `[[]]`.',
            ],
        },
        sources: [
            {title: 'Tree traversal: breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search'},
            {title: 'Breadth-first search, cp-algorithms', url: 'https://cp-algorithms.com/graph/breadth-first-search.html'},
        ],
        hints: ['Regular breadth-first traversal gives the levels in the opposite order.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_traverse_bottom_up(root)
{
    const levels = [];
    if (root !== null) {
        visit(root, 0);
    }
    return levels.reverse();
    function visit(current, depth) {
        levels[depth] ??= [];
        levels[depth].push(current.value);
        for (const child of current.children) {
            visit(child, depth + 1);
        }
    }
}`,
        solution_php: `<?php

function tree_traverse_bottom_up($root)
{
    $levels = [];
    if ($root !== null) {
        tree_traverse_bottom_up_visit($root, 0, $levels);
    }
    return array_reverse($levels);
}

function tree_traverse_bottom_up_visit($current, $depth, &$levels)
{
    $levels[$depth][] = $current->value;
    foreach ($current->children as $child) {
        tree_traverse_bottom_up_visit($child, $depth + 1, $levels);
    }
}`,
        cases: [
            {label: 'A deep uneven tree', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'A wide tree', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'One level', args: [{value: 0, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 10, children: [{value: 42, children: [{value: -46, children: [{value: 50, children: []}, {value: 29, children: [{value: -3, children: []}, {value: 90, children: []}]}, {value: 24, children: [{value: 75, children: [{value: 59, children: [{value: -31, children: [{value: 91, children: []}]}]}]}]}]}, {value: 28, children: []}, {value: -25, children: []}]}, {value: 70, children: [{value: -36, children: [{value: 32, children: []}]}, {value: 19, children: [{value: -18, children: []}, {value: -37, children: [{value: 54, children: []}]}, {value: 5, children: []}]}, {value: 32, children: [{value: 22, children: []}]}, {value: 29, children: [{value: 75, children: []}, {value: 32, children: []}]}, {value: 83, children: [{value: -30, children: []}]}]}, {value: 34, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'leaves',
        group: 'Walks',
        level: 1,
        title: 'Collect the leaves',
        fn: 'tree_collect_leaves',
        params: ['root'],
        signature: 'function tree_collect_leaves(root)',
        brief: 'Return the uids of the leaves, the nodes without children, from left to right.',
        rules: [],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'A leaf is a node whose `children` array is empty. The leaves from left to right are the leaves of the first child’s subtree, then those of the second, and so on. So any walk that finishes each subtree before it moves to the next sibling, as preorder does, meets them in the order wanted.\n\nIn code, walk in preorder and push `node.uid` into one shared array only when `node.children.length === 0`; then go on into the children as usual, a loop that does nothing at a leaf. A tree of one node is a leaf itself, and the answer is its uid alone.\n\nPostorder meets the leaves in the same order, since it moves only the inner nodes. Breadth-first order does not: it lists a shallow leaf before a deeper one to its left.',
            example: 'The walk starts at a, which has children, so nothing is pushed. It goes on to b: no children, so "b" is pushed. Then c: no children, "c" is pushed. The result is ["b", "c"].',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls waiting on the stack, plus the result, up to n − 1 leaves when they all hang under the root.',
            pitfalls: [
                'Testing `!node.children` or `node.children == []` never finds a leaf: an empty array is truthy, and `==` compares arrays by identity. Check the `length`.',
                'Collecting the nodes instead of their `uid`s fails every case: the answer is an array of strings.',
                'Returning from inside the loop over the children, say with what the first child’s walk found, stops the walk there and drops every leaf to the right.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
            {title: 'Tree traversal: pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
        ],
        hints: ['Walk in pre-order and push only when `node.children.length === 0`.', 'A tree with one node is all leaf: the root is the answer.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_collect_leaves(root)
{
    const out = [];
    subtree_walk(root);
    return out;
    function subtree_walk(node) {
        if (node.children.length === 0) {
            out.push(node.uid);
        }
        for (const child of node.children) {
            subtree_walk(child);
        }
    }
}`,
        solution_php: `<?php

function tree_collect_leaves($root)
{
    $out = [];
    tree_collect_leaves_walk($root, $out);
    return $out;
}

function tree_collect_leaves_walk($node, &$out)
{
    if (count($node->children) === 0) {
        $out[] = $node->uid;
    }
    foreach ($node->children as $child) {
        tree_collect_leaves_walk($child, $out);
    }
}`,
        cases: [
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'One parent, five leaves', args: [{uid: 'm', children: [{uid: 'n', children: []}, {uid: 'o', children: []}, {uid: 'p', children: []}, {uid: 'q', children: []}, {uid: 'r', children: []}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n4', children: [{uid: 'n6', children: [{uid: 'n20', children: [{uid: 'n30', children: [{uid: 'n61', children: []}]}, {uid: 'n31', children: [{uid: 'n40', children: [{uid: 'n50', children: [{uid: 'n91', children: []}, {uid: 'n113', children: []}]}]}, {uid: 'n108', children: []}]}, {uid: 'n32', children: [{uid: 'n83', children: [{uid: 'n97', children: []}]}]}, {uid: 'n101', children: [{uid: 'n114', children: []}]}]}, {uid: 'n34', children: []}, {uid: 'n41', children: []}, {uid: 'n58', children: []}]}, {uid: 'n12', children: [{uid: 'n24', children: [{uid: 'n44', children: [{uid: 'n49', children: [{uid: 'n65', children: []}]}, {uid: 'n76', children: []}]}, {uid: 'n47', children: []}, {uid: 'n107', children: []}]}, {uid: 'n39', children: [{uid: 'n90', children: [{uid: 'n118', children: []}]}]}, {uid: 'n53', children: []}]}, {uid: 'n59', children: [{uid: 'n109', children: [{uid: 'n117', children: []}]}]}, {uid: 'n88', children: []}]}]}, {uid: 'n8', children: []}, {uid: 'n9', children: [{uid: 'n18', children: [{uid: 'n37', children: [{uid: 'n38', children: [{uid: 'n66', children: [{uid: 'n68', children: []}, {uid: 'n102', children: []}]}]}, {uid: 'n51', children: []}, {uid: 'n79', children: []}, {uid: 'n98', children: []}, {uid: 'n103', children: []}]}, {uid: 'n57', children: [{uid: 'n73', children: []}, {uid: 'n85', children: [{uid: 'n93', children: []}]}]}, {uid: 'n72', children: [{uid: 'n100', children: []}]}]}, {uid: 'n22', children: [{uid: 'n26', children: [{uid: 'n28', children: [{uid: 'n54', children: []}]}, {uid: 'n43', children: [{uid: 'n86', children: []}]}]}, {uid: 'n27', children: [{uid: 'n115', children: []}]}, {uid: 'n45', children: []}, {uid: 'n67', children: []}]}, {uid: 'n35', children: []}, {uid: 'n78', children: []}]}, {uid: 'n17', children: [{uid: 'n75', children: [{uid: 'n89', children: []}]}]}, {uid: 'n33', children: [{uid: 'n119', children: []}]}, {uid: 'n63', children: []}, {uid: 'n81', children: [{uid: 'n82', children: []}]}]}, {uid: 'n3', children: [{uid: 'n5', children: []}, {uid: 'n7', children: []}, {uid: 'n14', children: [{uid: 'n70', children: []}, {uid: 'n96', children: []}]}]}, {uid: 'n10', children: [{uid: 'n13', children: [{uid: 'n16', children: [{uid: 'n52', children: [{uid: 'n64', children: []}]}]}, {uid: 'n19', children: [{uid: 'n55', children: [{uid: 'n77', children: []}]}]}]}, {uid: 'n15', children: []}, {uid: 'n23', children: []}, {uid: 'n29', children: [{uid: 'n48', children: []}, {uid: 'n95', children: []}]}, {uid: 'n84', children: []}, {uid: 'n111', children: []}]}, {uid: 'n11', children: [{uid: 'n21', children: [{uid: 'n62', children: [{uid: 'n87', children: []}]}, {uid: 'n106', children: []}]}, {uid: 'n94', children: []}, {uid: 'n99', children: []}, {uid: 'n112', children: []}]}, {uid: 'n25', children: [{uid: 'n36', children: [{uid: 'n60', children: [{uid: 'n71', children: [{uid: 'n104', children: []}]}]}]}, {uid: 'n42', children: [{uid: 'n69', children: [{uid: 'n105', children: [{uid: 'n116', children: []}]}]}]}, {uid: 'n46', children: []}, {uid: 'n92', children: []}]}, {uid: 'n56', children: [{uid: 'n74', children: []}]}, {uid: 'n80', children: []}, {uid: 'n110', children: []}]}]},
        ],
    },
    {
        uid: 'breadth-first-traversal',
        group: 'Walks',
        level: 2,
        title: 'Breadth-first traversal',
        fn: 'breadth_first',
        params: ['root'],
        signature: 'function breadth_first(root)',
        brief: 'Return an array of values level by level. Within each level, visit nodes from left to right.',
        rules: ['Keep duplicate values and return an empty array for a null root.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'Breadth-first order lists the tree level by level: the root, then every node at depth 1, then every node at depth 2, each level from left to right. Recursion does not fit here, since it follows one branch to the bottom before it looks at the next sibling. What fits is a queue, first in, first out: nodes come out in the order they went in.\n\nPut the root in the queue. Then, while the queue is not empty, take the node at its front, push its value, and add its children at the back, in order. At any moment the queue holds the rest of one level followed by the children found so far, which are one level deeper, so a level is always finished before a deeper node comes out. This is BFS, breadth-first search, with a queue.\n\nA JavaScript array works as the queue when you read it with an index `i` that moves forward, instead of taking items off with `shift()`, which can move every remaining item each time.',
            example: 'The queue starts as [5]. Take 5: push 5 and add its children, so the queue holds 2 and 8. Take 2: push 2; it has no children. Take 8: push 8; no children either. Nothing is left in the queue, and the result is [5, 2, 8].',
            cost: 'Time O(n): each node goes into the queue once and comes out once, as long as taking from the front is O(1); `shift()` in the loop can make it O(n²). Memory O(n): the array read with an index keeps every node, and even a real queue may hold a whole level, up to n − 1 nodes under one root.',
            pitfalls: [
                'A recursive walk gives preorder, not level order: as soon as 2 has a child, that child comes before 8.',
                'Taking from the end with `pop()` instead of from the front makes the queue a stack: the walk turns depth-first and right to left.',
                '`queue.shift()` inside the loop is fine on small trees and slow on big ones: it can move every remaining item each time.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Breadth-first search, cp-algorithms', url: 'https://cp-algorithms.com/graph/breadth-first-search.html'},
            {title: 'Breadth-first search visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/BFS.html'},
        ],
        hints: ['Use an array as a queue. Process it from front to back with an index, appending the current node’s children.', 'Recursion follows one branch to the bottom, which is the wrong shape here. Use a queue.', 'Avoid `shift()` inside the loop: it costs O(n) per call. A moving index over the same array does the same job.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function breadth_first(root)
{
    if (root === null) {
        return [];
    }
    let i = 0;

    const queue = [root];
    const out = [];
    while (i < queue.length) {
        const current = queue[i];
        out.push(current.value);
        queue.push(...current.children);
        ++i;
    }
    return out;
}`,
        solution_php: `<?php

function breadth_first($root)
{
    if ($root === null) {
        return [];
    }
    $i = 0;
    $queue = [$root];
    $out = [];
    while ($i < count($queue)) {
        $current = $queue[$i];
        $out[] = $current->value;
        array_push($queue, ...$current->children);
        ++$i;
    }
    return $out;
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Duplicate values', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Single node', args: [{value: 4, children: []}]},
            {label: 'Mixed branch depths', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Sibling order is unsorted', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Single branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'A single node', args: [{value: 1, children: []}]},
            {label: 'A chain', args: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}]},
            {label: 'One parent, five leaves', args: [{value: 13, children: [{value: 14, children: []}, {value: 15, children: []}, {value: 16, children: []}, {value: 17, children: []}, {value: 18, children: []}]}]},
            {label: 'A lopsided tree', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}]},
            {label: 'Thirty nodes, generated', args: [{value: 26, children: [{value: -6, children: []}, {value: 77, children: [{value: 2, children: []}, {value: -22, children: []}]}, {value: 14, children: [{value: -44, children: [{value: 90, children: []}]}]}, {value: 59, children: [{value: 32, children: [{value: 80, children: [{value: -40, children: []}, {value: -2, children: []}, {value: 76, children: []}]}, {value: 97, children: [{value: 29, children: []}, {value: -48, children: []}]}]}, {value: 75, children: [{value: 5, children: []}]}, {value: -32, children: [{value: 33, children: []}]}, {value: 96, children: [{value: 80, children: []}]}, {value: -2, children: []}, {value: 67, children: []}]}, {value: 11, children: [{value: -11, children: []}]}, {value: 54, children: [{value: -13, children: []}]}, {value: -18, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'zigzag-level-order',
        group: 'Walks',
        level: 2,
        title: 'Zigzag level order',
        fn: 'tree_traverse_zigzag',
        params: ['root'],
        signature: 'function tree_traverse_zigzag(root)',
        brief: 'Return one array per level, alternating reading direction.',
        rules: ['The root level starts left to right. Return [] for a null root.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The answer is the tree’s levels, one array of values per depth, read left to right on the root’s level, right to left on the next, and so on, alternating. The direction changes only how a level is written out, not how the tree is walked: go level by level in the normal left-to-right order, and reverse the values of every second level.\n\nKeep the current level as an array of nodes, starting with `[root]`. For each level, collect the values of its nodes and, in the same loop, their children in order: those make the next level. If the level’s index in the result is odd, reverse its values before you add them. Then move on to the next level, until one is empty. This is breadth-first search taken one whole level at a time.',
            example: 'The first level is [5]: its values are [5], at index 0, kept as they are, and its children make the next level, 2 and 8. That level has the values [2, 8] at index 1, so they are reversed to [8, 2]. Neither 2 nor 8 has children, the next level is empty, and the result is [[5], [8, 2]].',
            cost: 'Time O(n): each node is read once and each value reversed at most once. Memory O(n) for the result, plus two levels of nodes at a time, up to n − 1 nodes on a wide tree.',
            pitfalls: [
                'Building the next level from a reversed level scrambles it: reading [8, 2] for their children gives the children of 8 before those of 2. Reverse only the values you output, never the nodes the next level is built from.',
                'Reversing the root’s level first gets every level backward: the root’s level reads left to right, and level 1 is the first one reversed.',
                'Reversing a node’s `children` array in place, to read it right to left, changes the input, which the rules forbid.',
            ],
        },
        sources: [
            {title: 'Tree traversal: breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search'},
            {title: 'Breadth-first search, cp-algorithms', url: 'https://cp-algorithms.com/graph/breadth-first-search.html'},
        ],
        hints: ['Build each next level using normal left-to-right child order.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_traverse_zigzag(root)
{
    if (root === null) {
        return [];
    }
    let level = [root];

    const out = [];
    while (level.length > 0) {
        const values = [];
        const next = [];
        for (const current of level) {
            values.push(current.value);
            next.push(...current.children);
        }
        if (out.length % 2 === 1) {
            values.reverse();
        }
        out.push(values);
        level = next;
    }
    return out;
}`,
        solution_php: `<?php

function tree_traverse_zigzag($root)
{
    if ($root === null) {
        return [];
    }
    $level = [$root];
    $out = [];
    while (count($level) > 0) {
        $values = [];
        $next = [];
        foreach ($level as $current) {
            $values[] = $current->value;
            array_push($next, ...$current->children);
        }
        if (count($out) % 2 === 1) {
            $values = array_reverse($values);
        }
        $out[] = $values;
        $level = $next;
    }
    return $out;
}`,
        cases: [
            {label: 'Four levels', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Mixed branch depths', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'One child chain', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Single node', args: [{value: 0, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 55, children: [{value: 24, children: [{value: 81, children: [{value: 58, children: []}, {value: -10, children: []}, {value: 92, children: [{value: 82, children: []}, {value: 3, children: []}]}, {value: 41, children: []}]}]}, {value: 34, children: [{value: 7, children: [{value: -49, children: [{value: 85, children: [{value: -42, children: [{value: 82, children: []}]}]}, {value: 56, children: [{value: -47, children: []}]}]}, {value: 55, children: []}, {value: -16, children: [{value: 24, children: [{value: 74, children: []}]}, {value: 8, children: [{value: 64, children: []}]}]}, {value: 32, children: [{value: 84, children: []}]}, {value: -44, children: []}, {value: 14, children: []}]}, {value: 84, children: []}, {value: 44, children: [{value: 44, children: []}]}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'record-an-euler-tour',
        group: 'Walks',
        level: 2,
        title: 'Record an Euler tour',
        fn: 'tree_traverse_euler',
        params: ['root'],
        signature: 'function tree_traverse_euler(root)',
        brief: 'Return ["enter", value] on entry to a node and ["exit", value] on exit.',
        rules: ['Visit children left to right. Every node contributes exactly two events, including leaves. Return [] for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'An Euler tour walks around the tree the way a pencil traces its outline: it enters a node, tours each child’s subtree in turn, and exits the node on the way back up. Record `["enter", value]` when a node is entered and `["exit", value]` when it is left. Every node gives exactly two events, so a tree of n nodes gives 2n.\n\nIt is one depth-first walk doing both preorder and postorder work: push the enter event before the loop over the children, the exit event after it. The key property is nesting: all the events of a node’s descendants lie between its enter and its exit, like matched parentheses. That is what makes the tour useful: a node is an ancestor of another exactly when it is entered before it and exited after it, and each subtree is one unbroken stretch of the tour.\n\nA leaf has nothing between its two events: its exit follows its enter at once.',
            example: 'visit(5) records ["enter", 5], then tours its children: visit(2) records ["enter", 2] and, with no children, ["exit", 2] right after; visit(8) records ["enter", 8] and ["exit", 8]. Back in visit(5), the loop is over and it records ["exit", 5]. The result is [["enter", 5], ["enter", 2], ["exit", 2], ["enter", 8], ["exit", 8], ["exit", 5]]: six events for three nodes.',
            cost: 'Time O(n): each node is visited once and gives two events. Memory O(n) for the 2n events, plus O(h) for the calls waiting on the stack.',
            pitfalls: [
                'Recording the exit right after the enter, before the loop, closes every node at once: the events of its descendants fall outside its brackets, and the nesting is lost.',
                'Leaving out the exit of a leaf, or giving it a single event, breaks the rule of two events for every node.',
                'Pairing events by value, say to find which enter an exit closes, fails on repeated values: each visit is its own pair.',
            ],
        },
        sources: [
            {title: 'Euler tour technique, Wikipedia', url: 'https://en.wikipedia.org/wiki/Euler_tour_technique'},
            {title: 'Depth-first search, cp-algorithms', url: 'https://cp-algorithms.com/graph/depth-first-search.html'},
            {title: 'Lowest common ancestor, cp-algorithms', url: 'https://cp-algorithms.com/graph/lca.html'},
        ],
        hints: ['Emit one event before visiting children and one afterward.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_traverse_euler(root)
{
    const out = [];
    if (root !== null) {
        visit(root);
    }
    return out;
    function visit(current) {
        out.push(['enter', current.value]);
        for (const child of current.children) {
            visit(child);
        }
        out.push(['exit', current.value]);
    }
}`,
        solution_php: `<?php

function tree_traverse_euler($root)
{
    $out = [];
    if ($root !== null) {
        tree_traverse_euler_visit($root, $out);
    }
    return $out;
}

function tree_traverse_euler_visit($current, &$out)
{
    $out[] = ['enter', $current->value];
    foreach ($current->children as $child) {
        tree_traverse_euler_visit($child, $out);
    }
    $out[] = ['exit', $current->value];
}`,
        cases: [
            {label: 'Both sibling events stay nested', args: [{value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}]},
            {label: 'Equal values are separate visits', args: [{value: 0, children: [{value: 0, children: []}]}]},
            {label: 'Single leaf', args: [{value: 7, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: -26, children: [{value: -25, children: [{value: -20, children: [{value: 96, children: [{value: 78, children: []}, {value: 96, children: []}]}]}, {value: -5, children: [{value: 0, children: [{value: 66, children: [{value: 40, children: [{value: -9, children: [{value: 16, children: []}]}, {value: 83, children: []}]}, {value: 56, children: []}]}]}, {value: 1, children: [{value: -42, children: []}]}]}, {value: -27, children: []}]}, {value: 24, children: [{value: -33, children: [{value: -12, children: [{value: 77, children: []}]}, {value: -31, children: []}]}, {value: 62, children: [{value: 71, children: [{value: -11, children: []}]}, {value: -49, children: []}, {value: 53, children: []}]}]}, {value: -12, children: [{value: -26, children: []}]}, {value: -9, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'levels',
        group: 'Walks',
        level: 2,
        title: 'Group uids by depth',
        fn: 'uids_by_depth_from_tree',
        params: ['root'],
        signature: 'function uids_by_depth_from_tree(root)',
        brief: 'Group the uids by depth. Return an array where item 0 holds the uid of the root, item 1 the uids at depth 1, and so on, each group from left to right.',
        rules: [],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'The answer has one group per depth: item 0 holds the root’s uid, item 1 the uids at depth 1, and so on, each group from left to right. The depth of a node is one more than its parent’s, so a walk that carries the depth down as an argument knows where each node belongs.\n\nWalk in preorder with `depth` as a second argument, starting at 0, and push each uid into `out[depth]`, making the group the first time that depth comes up. Each group comes out left to right: preorder finishes a node’s whole subtree before the next sibling, so of two nodes at the same depth, the one on the left is always met first. No queue is needed, though a breadth-first walk would give the same groups.\n\nNo depth is ever skipped: a node at depth d is reached through its parent at d − 1, whose group already exists, so the result has no holes.',
            example: 'The walk starts at a with depth 0: out[0] is ["a"]. Its children are at depth 1: b makes out[1] = ["b"], and c is pushed into it: ["b", "c"]. Neither has children, and the result is [["a"], ["b", "c"]].',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the groups, plus O(h) for the calls waiting on the stack.',
            pitfalls: [
                '`out[depth].push(uid)` before the group exists throws, since `undefined` has no `push`: make it first, for example with `out[depth] ??= []`.',
                'A depth kept in one shared variable, incremented on the way down and never decremented, puts every later sibling a level too deep; passed as an argument, it comes back by itself when the call returns.',
                'Grouping the nodes instead of their `uid`s fails every case: the groups hold strings.',
            ],
        },
        sources: [
            {title: 'Tree traversal: pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Tree (data structure): terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Terminology'},
        ],
        hints: ['Pass the depth down a pre-order walk and push each uid into `out[depth]`, creating the group when it is missing.', 'Pre-order meets the nodes of every level from left to right, so the groups come out ordered without a queue.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function uids_by_depth_from_tree(root)
{
    const out = [];
    subtree_walk(root, 0);
    return out;
    function subtree_walk(node, depth) {
        out[depth] ??= [];
        out[depth].push(node.uid);
        for (const child of node.children) {
            subtree_walk(child, depth + 1);
        }
    }
}`,
        solution_php: `<?php

function uids_by_depth_from_tree($root)
{
    $out = [];
    uids_by_depth_from_tree_walk($root, 0, $out);
    return $out;
}

function uids_by_depth_from_tree_walk($node, $depth, &$out)
{
    $out[$depth][] = $node->uid;
    foreach ($node->children as $child) {
        uids_by_depth_from_tree_walk($child, $depth + 1, $out);
    }
}`,
        cases: [
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'One parent, five leaves', args: [{uid: 'm', children: [{uid: 'n', children: []}, {uid: 'o', children: []}, {uid: 'p', children: []}, {uid: 'q', children: []}, {uid: 'r', children: []}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n4', children: [{uid: 'n13', children: [{uid: 'n35', children: [{uid: 'n81', children: []}]}, {uid: 'n46', children: []}]}]}, {uid: 'n39', children: [{uid: 'n49', children: [{uid: 'n86', children: []}]}, {uid: 'n61', children: [{uid: 'n90', children: [{uid: 'n104', children: []}]}]}, {uid: 'n99', children: [{uid: 'n106', children: []}, {uid: 'n115', children: []}]}]}, {uid: 'n64', children: [{uid: 'n107', children: []}]}, {uid: 'n69', children: []}, {uid: 'n83', children: [{uid: 'n108', children: [{uid: 'n116', children: []}]}]}]}, {uid: 'n6', children: [{uid: 'n12', children: []}, {uid: 'n19', children: [{uid: 'n22', children: [{uid: 'n68', children: []}, {uid: 'n75', children: []}, {uid: 'n92', children: [{uid: 'n103', children: []}]}]}, {uid: 'n25', children: [{uid: 'n42', children: []}, {uid: 'n56', children: [{uid: 'n82', children: []}]}]}]}, {uid: 'n29', children: []}]}, {uid: 'n21', children: [{uid: 'n95', children: []}]}, {uid: 'n65', children: []}]}, {uid: 'n5', children: [{uid: 'n7', children: [{uid: 'n11', children: [{uid: 'n36', children: []}, {uid: 'n44', children: [{uid: 'n57', children: [{uid: 'n76', children: []}]}]}]}, {uid: 'n15', children: [{uid: 'n23', children: [{uid: 'n43', children: [{uid: 'n63', children: []}]}]}, {uid: 'n54', children: []}]}, {uid: 'n17', children: [{uid: 'n73', children: [{uid: 'n89', children: [{uid: 'n105', children: []}]}]}]}, {uid: 'n51', children: []}]}, {uid: 'n8', children: [{uid: 'n9', children: [{uid: 'n14', children: [{uid: 'n26', children: [{uid: 'n31', children: [{uid: 'n38', children: []}, {uid: 'n58', children: []}, {uid: 'n67', children: []}, {uid: 'n88', children: [{uid: 'n97', children: []}, {uid: 'n98', children: []}]}, {uid: 'n110', children: []}]}, {uid: 'n41', children: [{uid: 'n78', children: [{uid: 'n102', children: []}]}]}, {uid: 'n45', children: [{uid: 'n80', children: [{uid: 'n101', children: []}]}, {uid: 'n96', children: []}]}]}, {uid: 'n40', children: [{uid: 'n52', children: [{uid: 'n72', children: []}]}]}, {uid: 'n53', children: []}, {uid: 'n60', children: []}, {uid: 'n70', children: []}]}]}, {uid: 'n10', children: [{uid: 'n32', children: []}, {uid: 'n74', children: []}, {uid: 'n118', children: []}]}]}, {uid: 'n18', children: []}, {uid: 'n20', children: [{uid: 'n71', children: [{uid: 'n93', children: []}, {uid: 'n100', children: []}]}, {uid: 'n87', children: []}]}, {uid: 'n34', children: [{uid: 'n85', children: []}]}, {uid: 'n94', children: []}, {uid: 'n111', children: []}]}, {uid: 'n24', children: []}, {uid: 'n47', children: [{uid: 'n50', children: [{uid: 'n66', children: []}, {uid: 'n77', children: []}, {uid: 'n112', children: [{uid: 'n114', children: []}]}]}, {uid: 'n119', children: []}]}]}, {uid: 'n16', children: [{uid: 'n30', children: [{uid: 'n37', children: [{uid: 'n48', children: []}]}, {uid: 'n62', children: []}]}]}, {uid: 'n27', children: [{uid: 'n28', children: [{uid: 'n33', children: [{uid: 'n59', children: [{uid: 'n84', children: []}]}, {uid: 'n79', children: [{uid: 'n113', children: []}]}]}, {uid: 'n55', children: []}, {uid: 'n117', children: []}]}]}, {uid: 'n91', children: [{uid: 'n109', children: []}]}]}]},
        ],
    },
    {
        uid: 'walk-with-stack',
        group: 'Walks',
        level: 2,
        title: 'Walk without recursion',
        fn: 'tree_walk_preorder_with_stack',
        params: ['root'],
        signature: 'function tree_walk_preorder_with_stack(root)',
        brief: 'Return the uids in pre-order without recursion. One test is a chain 100,000 nodes deep, which overflows the call stack of a recursive walk.',
        rules: [],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'A recursive walk keeps its place on the call stack: each waiting call is a node whose remaining children are still to be visited. That stack is small, some thousands of calls in Node or a browser, so a chain 100,000 nodes deep overflows it. The fix is to keep the place on a stack of your own, an ordinary array, which can grow as far as memory allows.\n\nStart with `[root]`. While the stack is not empty, pop a node, push its uid into the result, and push its children onto the stack in reverse order, last child first. A stack hands back the last item put in, so the first child comes out next, and its whole subtree is popped before the second child, which waited under it, comes up: exactly preorder.\n\nThe invariant: the stack holds, top to bottom, the subtrees still to walk, in the order preorder takes them. Each pop takes the next node of the preorder, and its children go on top, since they come before everything that was already waiting.',
            example: 'The stack starts as [a]. Pop a: record "a", push c, then b, so b is on top. Pop b: record "b"; it has no children. Pop c: record "c". The stack is empty, and the walk is ["a", "b", "c"].',
            cost: 'Time O(n): each node is pushed once and popped once. Memory O(n) at worst for the stack, which holds the waiting siblings along the current path; on a chain it never holds more than one node, so depth costs nothing.',
            pitfalls: [
                'Pushing the children in their own order brings the last child out first: the walk goes right to left, ["a", "c", "b"] for the example.',
                '`stack.shift()` instead of `pop()` takes from the front, which makes the array a queue: the walk becomes breadth-first.',
                '`stack.push(...node.children.reverse())` reverses the tree’s own array, which the rules forbid: count an index down instead.',
            ],
        },
        sources: [
            {title: 'Tree traversal: pre-order implementation, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_implementation'},
            {title: 'Stack (abstract data type), Wikipedia', url: 'https://en.wikipedia.org/wiki/Stack_(abstract_data_type)'},
            {title: 'Recursion (computer science): recursion versus iteration, Wikipedia', url: 'https://en.wikipedia.org/wiki/Recursion_(computer_science)#Recursion_versus_iteration'},
        ],
        hints: ['Replace the call stack with your own array. Start with `[root]`; pop a node, record it, push its children.', 'A stack hands back the last item pushed. Push the children in reverse order so the leftmost child is popped first.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_walk_preorder_with_stack(root)
{
    const out = [];
    const stack = [root];
    while (stack.length > 0) {
        const node = stack.pop();
        out.push(node.uid);
        for (let i = node.children.length - 1; i >= 0; --i) {
            stack.push(node.children[i]);
        }
    }
    return out;
}`,
        solution_php: null,
        php_note: 'one test is a chain 100,000 nodes deep, made in JavaScript',
        cases: [
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'One parent, five leaves', args: [{uid: 'm', children: [{uid: 'n', children: []}, {uid: 'o', children: []}, {uid: 'p', children: []}, {uid: 'q', children: []}, {uid: 'r', children: []}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: 'A chain 100,000 nodes deep', args: [{$make: 'chain', size: 100000}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n5', children: [{uid: 'n107', children: []}]}, {uid: 'n6', children: [{uid: 'n10', children: [{uid: 'n12', children: [{uid: 'n22', children: [{uid: 'n41', children: []}, {uid: 'n58', children: [{uid: 'n80', children: [{uid: 'n102', children: [{uid: 'n112', children: []}]}]}]}]}, {uid: 'n34', children: [{uid: 'n79', children: []}, {uid: 'n98', children: []}, {uid: 'n108', children: []}]}, {uid: 'n38', children: []}]}, {uid: 'n45', children: []}, {uid: 'n62', children: [{uid: 'n68', children: [{uid: 'n87', children: []}, {uid: 'n111', children: []}]}]}, {uid: 'n106', children: []}]}, {uid: 'n27', children: []}, {uid: 'n32', children: [{uid: 'n73', children: []}]}, {uid: 'n60', children: []}]}, {uid: 'n7', children: []}, {uid: 'n71', children: [{uid: 'n77', children: []}]}]}, {uid: 'n11', children: [{uid: 'n29', children: [{uid: 'n30', children: [{uid: 'n35', children: [{uid: 'n36', children: [{uid: 'n117', children: []}]}, {uid: 'n42', children: [{uid: 'n51', children: []}, {uid: 'n74', children: [{uid: 'n83', children: []}, {uid: 'n118', children: []}]}]}, {uid: 'n56', children: [{uid: 'n93', children: []}]}, {uid: 'n59', children: []}, {uid: 'n84', children: [{uid: 'n85', children: [{uid: 'n86', children: []}]}]}]}, {uid: 'n101', children: []}]}, {uid: 'n44', children: []}]}]}, {uid: 'n20', children: [{uid: 'n25', children: [{uid: 'n37', children: []}]}]}, {uid: 'n52', children: [{uid: 'n61', children: [{uid: 'n88', children: []}, {uid: 'n92', children: []}]}]}, {uid: 'n91', children: []}, {uid: 'n95', children: []}, {uid: 'n104', children: []}]}, {uid: 'n3', children: [{uid: 'n4', children: [{uid: 'n8', children: [{uid: 'n64', children: []}, {uid: 'n69', children: []}, {uid: 'n70', children: []}, {uid: 'n99', children: []}]}, {uid: 'n9', children: [{uid: 'n31', children: []}, {uid: 'n67', children: []}]}, {uid: 'n14', children: [{uid: 'n15', children: [{uid: 'n40', children: [{uid: 'n47', children: [{uid: 'n54', children: [{uid: 'n97', children: []}]}, {uid: 'n90', children: []}]}]}]}, {uid: 'n17', children: [{uid: 'n46', children: []}, {uid: 'n55', children: []}, {uid: 'n66', children: [{uid: 'n109', children: []}]}]}, {uid: 'n18', children: [{uid: 'n53', children: []}, {uid: 'n76', children: []}]}, {uid: 'n23', children: [{uid: 'n48', children: []}, {uid: 'n75', children: []}]}, {uid: 'n72', children: [{uid: 'n89', children: []}]}]}, {uid: 'n24', children: [{uid: 'n43', children: [{uid: 'n82', children: [{uid: 'n116', children: []}]}]}, {uid: 'n100', children: []}]}, {uid: 'n65', children: [{uid: 'n78', children: [{uid: 'n115', children: []}]}]}]}, {uid: 'n13', children: [{uid: 'n103', children: []}]}, {uid: 'n16', children: []}, {uid: 'n19', children: []}, {uid: 'n21', children: [{uid: 'n39', children: [{uid: 'n50', children: []}]}]}, {uid: 'n26', children: [{uid: 'n49', children: [{uid: 'n57', children: []}, {uid: 'n81', children: [{uid: 'n94', children: []}, {uid: 'n110', children: []}]}, {uid: 'n105', children: [{uid: 'n113', children: []}]}, {uid: 'n114', children: []}]}, {uid: 'n63', children: [{uid: 'n119', children: []}]}]}, {uid: 'n96', children: []}]}, {uid: 'n28', children: []}, {uid: 'n33', children: []}]}]},
        ],
    },
    {
        uid: 'iterate',
        group: 'Walks',
        level: 2,
        title: 'Yield nodes lazily',
        fn: 'tree_iterate',
        params: ['root'],
        signature: 'function* tree_iterate(root)',
        brief: 'Write a generator that yields every node in pre-order, lazily: it does no work for nodes the caller never asks for.',
        rules: ['Yield the node objects, not their uids.', 'Callers may stop early, for example with `break` inside `for...of`.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'A generator function, `function*`, returns an iterator: nothing in its body runs until the caller asks for the first value, and each `yield` hands out one value and pauses there until the caller asks again. A walk written as a generator is therefore lazy: if the caller stops after three nodes, the rest of the tree is never read.\n\nFor preorder, yield the root, then, for each child in order, hand over to the generator of that child’s subtree with `yield*`, which passes on every value that generator yields, as it yields it, and goes on when it is done. It is the recursive preorder with `out.push(node)` replaced by `yield node`: each paused generator remembers where it is in its loop, as a waiting call does in the recursive version.\n\nA `break` in the caller’s `for...of` simply stops asking: the paused generators are closed and never resume. Building an array of all the nodes first and returning it, or yielding from it, gives the right order but reads the whole tree before the first value: not lazy.',
            example: 'Spread with `[...tree_iterate(root)]`, the generator yields a and pauses. Asked again, it enters its loop and hands over with `yield*` to the generator of b, which yields b; b has no children, so that generator ends and the loop moves on to c, whose generator yields c. Then the loop is over and the generator ends: the nodes a, b and c, in that order. A caller that breaks after a never even makes the generator of b.',
            cost: 'Time: a node at depth d is handed up through d `yield*` levels, so the whole walk costs the sum of all depths: about O(n log n) on a balanced tree, O(n²) on a chain. Memory O(h): one paused generator per node on the current path. Resuming the deepest generator nests one call per level, so a chain some thousands of nodes deep overflows the stack; a generator over an explicit stack, as in Walk without recursion, avoids both.',
            pitfalls: [
                'Collecting the nodes into an array first, and returning it or yielding from it, reads the whole tree before the first value: the test pulls three nodes from a 2,000-node tree and counts the reads of `children`.',
                '`yield tree_iterate(child)` without the star yields the inner generator object itself, not its nodes.',
                'Yielding `node.uid` instead of the node: the rules ask for the node objects.',
            ],
        },
        sources: [
            {title: 'Generator (computer programming): ECMAScript, Wikipedia', url: 'https://en.wikipedia.org/wiki/Generator_(computer_programming)#ECMAScript'},
            {title: 'function*, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*'},
            {title: 'yield*, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*'},
        ],
        hints: ['`yield root;` then, for each child, delegate with `yield*` to the generator for that child.', 'Building an array first and returning it is not lazy. One test pulls three nodes from a large tree and checks that almost none of it was read.'],
        observe: 'iterable',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function* tree_iterate(root)
{
    yield root;
    for (const child of root.children) {
        yield* tree_iterate(child);
    }
}`,
        solution_php: null,
        php_note: 'it is about JavaScript generators',
        cases: [
            {label: 'The bushy tree, collected with spread', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: 'Stays lazy: 3 nodes pulled out of 2,000', kind: 'lazy', note: 'Pulls three nodes with `next()` from a 2,000-node tree, then checks that `children` was read fewer than 200 times. An eager walk reads it thousands of times.'},
        ],
    },
    {
        uid: 'find',
        group: 'Search',
        level: 1,
        title: 'Find a node by uid',
        fn: 'tree_find',
        params: ['root', 'uid'],
        signature: 'function tree_find(root, uid)',
        brief: 'Return the node with the given uid, or `null` when the tree has no such node.',
        rules: ['Return the node object from the tree, not a copy.', 'Stop searching as soon as the node is found.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, uid: '\'c\''}},
        explanation: {
            approach: 'This is a depth-first search in preorder: look at a node before anything under it. If `root.uid` is the uid, `root` is the answer. If not, the node can only be in the subtree of one of the children, so ask each child the same question, `tree_find(child, uid)`, in order.\n\nThe first child that answers with a node ends the search: return that answer at once and do not ask the children after it. That is the rule “stop as soon as the node is found”, and it is why the loop is a `for...of`: a `return` inside a `forEach` callback only leaves the callback. When every child answers `null`, the uid is not in this subtree, so return `null`, and the caller goes on with the next sibling.\n\nReturn the node object itself. The caller wants to rename it, add children to it or delete it, and a copy would let it change an object that is not in the tree.',
            example: 'Search for uid `\'c\'`. tree_find(a) checks a: not c. It asks its first child: tree_find(b) checks b, not c, and b has no children, so it returns `null`. The loop goes on to the second child: tree_find(c) checks c, a match, and returns that node. tree_find(a) got a node back, so it returns it at once: the very object that sits in `a.children[1]`. A search for `\'zz\'` gets `null` from all three calls.',
            cost: 'Time O(n) at worst, when the uid is in the last node or not there at all; a hit early in preorder stops much sooner. Memory O(h) for the calls waiting on the stack, up to n on a chain.',
            pitfalls: [
                'A `return` inside `root.children.forEach(...)` leaves only the callback: the found node is dropped, the loop goes on, and the function reaches its final `return null`.',
                'Testing the answer of a child with `if (found !== undefined)` lets the `null` of the first empty subtree end the search, and nodes in later siblings are never found.',
                'Returning a copy, `{...node}`, gives an equal object that is not in the tree: changing it changes nothing, and the test rejects it.',
            ],
        },
        sources: [
            {title: 'Depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Depth-first_search'},
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'for...of: Early exiting, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of#early_exiting'},
        ],
        hints: ['Check the node itself first. Then ask the subtree of each child and return the first answer that is not `null`.', 'A `return` inside a callback does not leave your function. Loop with `for...of`.'],
        observe: 'node',
        check: 'same_node',
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_find(root, uid)
{
    if (root.uid === uid) {
        return root;
    }
    for (const child of root.children) {
        const found = tree_find(child, uid);
        if (found) {
            return found;
        }
    }
    return null;
}`,
        solution_php: `<?php

function tree_find($root, $uid)
{
    if ($root->uid === $uid) {
        return $root;
    }
    foreach ($root->children as $child) {
        $found = tree_find($child, $uid);
        if ($found !== null) {
            return $found;
        }
    }
    return null;
}`,
        cases: [
            {label: 'The root itself', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'a']},
            {label: 'A deep leaf', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'i']},
            {label: 'A node in the middle', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'c']},
            {label: 'A uid that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'zz']},
            {label: 'In a single node', args: [{uid: 'a', children: []}, 'a']},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, 'n23']},
        ],
    },
    {
        uid: 'find-a-root-to-node-path',
        group: 'Search',
        level: 2,
        title: 'Find a root-to-node path',
        fn: 'find_path',
        params: ['root', 'target'],
        signature: 'function find_path(root, target)',
        brief: 'Return the values on the path from the root through the first node whose value equals target.',
        rules: ['Include both endpoints. If several nodes match, use the first in preorder. Return null if no node matches.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, target: 8}},
        explanation: {
            approach: 'The path to a node is its ancestors, from the root down, then the node itself. Recursion builds it on the way back. If the root holds target, the path is just `[root.value]`. Otherwise ask each child for the path from that child to target; when one answers with a path, put `root.value` in front of it and return. A child that answers `null` has no match under it, and the loop goes on to the next child.\n\nThe rule “the first match in preorder” comes free from the order of the checks: a node is checked before its children, the children are tried left to right, and the first answer is returned at once. This is a depth-first search, not a shortest path: a match deep in the first branch beats a shallower one in a later branch, and a search level by level (BFS) would find the wrong one.\n\nThe empty tree, `null`, has no match: return `null`.',
            example: 'Search for target 8. find_path on 5: 5 is not 8, so ask the children. find_path on 2: 2 is not 8 and has no children, so `null`. find_path on 8: a match, it returns [8]. Back at the root, the second child answered with a path, so the root returns 5 in front of it: [5, 8].',
            cost: 'Time O(n) to find the node, plus O(h²) for the copies: each level on the way back builds a new array one longer than the one below. Memory O(h). One shared array, pushed on the way down and popped when a branch fails, gets the copying down to one copy of the path.',
            pitfalls: [
                'Searching level by level, or keeping the shallowest match, returns [8, 0] where the answer is [8, 9, 0]: the first match in preorder can be deeper than another one.',
                'Answering `[]` for “no match”: an empty array is truthy, so the caller sees a path and returns `[root.value]` for a target that is not there.',
                'Reading `root.value` before checking for `null` throws on the empty tree.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Depth-first_search'},
        ],
        hints: ['If a child returns a path, prepend the current value. Stop at the first match.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function find_path(root, target)
{
    if (root === null) {
        return null;
    }
    if (root.value === target) {
        return [root.value];
    }
    for (const child of root.children) {
        const path = find_path(child, target);
        if (path !== null) {
            return [root.value, ...path];
        }
    }
    return null;
}`,
        solution_php: `<?php

function find_path($root, $target)
{
    if ($root === null) {
        return null;
    }
    if ($root->value === $target) {
        return [$root->value];
    }
    foreach ($root->children as $child) {
        $path = find_path($child, $target);
        if ($path !== null) {
            return [$root->value, ...$path];
        }
    }
    return null;
}`,
        cases: [
            {label: 'Deep match', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 7]},
            {label: 'Missing value', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 99]},
            {label: 'Root matches', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 8]},
            {label: 'Duplicate matches', args: [{value: 0, children: [{value: 1, children: [{value: 5, children: []}]}, {value: 2, children: [{value: 5, children: []}]}]}, 5]},
            {label: 'Empty tree', args: [null, 0]},
            {label: 'Deep match beats a shallower duplicate', args: [{value: 8, children: [{value: 9, children: [{value: 0, children: []}]}, {value: 0, children: []}]}, 0]},
            {label: 'Match in the last branch', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}, 5]},
            {label: 'Negative target', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}, -8]},
            {label: 'A deep leaf', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 9]},
            {label: 'The root itself', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 1]},
            {label: 'The last child of the root', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 7]},
            {label: 'A value that is not there', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, -1]},
            {label: 'Down the long side', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}, 8]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}, 31]},
            {label: 'Deep in thirty generated nodes', args: [{value: 79, children: [{value: -14, children: [{value: -35, children: []}]}, {value: 89, children: [{value: -11, children: [{value: 94, children: []}]}, {value: -17, children: []}, {value: -14, children: []}, {value: 83, children: [{value: 75, children: []}]}]}, {value: 10, children: [{value: -35, children: [{value: 73, children: [{value: -23, children: [{value: 14, children: []}]}, {value: 13, children: []}]}, {value: 41, children: [{value: 40, children: [{value: 79, children: [{value: 70, children: []}]}, {value: 24, children: []}]}]}]}, {value: 78, children: [{value: 1, children: []}, {value: -14, children: []}]}, {value: 69, children: [{value: 8, children: [{value: -14, children: []}]}]}]}, {value: 17, children: [{value: 54, children: []}, {value: 72, children: []}]}]}, 72]},
            {label: 'The end of a chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}, 49]},
        ],
    },
    {
        uid: 'list-root-to-leaf-paths',
        group: 'Search',
        level: 2,
        title: 'List root-to-leaf paths',
        fn: 'tree_list_leaf_paths',
        params: ['root'],
        signature: 'function tree_list_leaf_paths(root)',
        brief: 'Return an array of paths from the root to every leaf. Each path is an array of node values.',
        rules: ['List leaves in left-to-right order. Keep both endpoints and keep repeated paths if they come from distinct leaves.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'Every leaf has exactly one path from the root, and a preorder walk meets the leaves from left to right. So the task is a walk that knows, at every node, the path from the root to it. Keep that path in one array, `path`: push the value when the walk enters a node, and pop it when the walk leaves the node, after all its children are done. At any moment `path` holds exactly the values from the root to the current node.\n\nAt a leaf, `current.children` is empty and `path` is a whole root-to-leaf path: save a copy of it, `path.slice()`. The copy matters. The array keeps changing as the walk goes on, and saving the array itself would leave the result holding one and the same array many times, empty by the end.\n\nThis push, recurse, pop pattern is called backtracking. An empty tree has no leaves: return `[]`, not `null`.',
            example: 'visit(5) pushes 5: `path` is [5]. 5 has children, so nothing is saved; visit(2) pushes 2: [5, 2]. 2 is a leaf: save a copy, [5, 2], then pop: [5]. visit(8) pushes 8: [5, 8], a leaf: save [5, 8], then pop: [5]. Back in 5, pop: []. The result is [[5, 2], [5, 8]].',
            cost: 'Time O(n + L × h), L the number of leaves: each node is pushed and popped once, and each saved copy is as long as its path. The result alone takes O(L × h) memory; the walk adds O(h) for the calls and `path`.',
            pitfalls: [
                'Saving `path` itself instead of a copy: every saved path is the same array, and after the last pop they all read `[]`.',
                'Forgetting the pop: values of a finished branch stay in `path`, and the second leaf gets [5, 2, 8] instead of [5, 8].',
                'Removing duplicate paths: two leaves 2 under one root 5 are two paths, [[5, 2], [5, 2]].',
            ],
        },
        sources: [
            {title: 'Backtracking, Wikipedia', url: 'https://en.wikipedia.org/wiki/Backtracking'},
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
        ],
        hints: ['With a shared path buffer, copy it at each leaf and pop the current node when leaving its branch.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_list_leaf_paths(root)
{
    const out = [];
    const path = [];
    if (root !== null) {
        visit(root);
    }
    return out;
    function visit(current) {
        path.push(current.value);
        if (current.children.length === 0) {
            out.push(path.slice());
        }
        for (const child of current.children) {
            visit(child);
        }
        path.pop();
    }
}`,
        solution_php: `<?php

function tree_list_leaf_paths($root)
{
    $out = [];
    $path = [];
    if ($root !== null) {
        tree_list_leaf_paths_visit($root, $path, $out);
    }
    return $out;
}

function tree_list_leaf_paths_visit($current, &$path, &$out)
{
    $path[] = $current->value;
    if (count($current->children) === 0) {
        // a copy: PHP arrays are values
        $out[] = $path;
    }
    foreach ($current->children as $child) {
        tree_list_leaf_paths_visit($child, $path, $out);
    }
    array_pop($path);
}`,
        cases: [
            {label: 'Leaves at different depths', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'Equal paths from distinct leaves', args: [{value: 5, children: [{value: 2, children: []}, {value: 2, children: []}]}]},
            {label: 'One deep path', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'The root is also a leaf', args: [{value: -2, children: []}]},
            {label: 'Zero values along a path', args: [{value: 0, children: [{value: 0, children: [{value: 0, children: []}]}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 99, children: [{value: 37, children: [{value: 93, children: []}, {value: -2, children: []}, {value: -15, children: [{value: 33, children: []}]}, {value: -3, children: [{value: -20, children: [{value: 83, children: [{value: 96, children: [{value: 44, children: []}]}]}]}, {value: 27, children: []}]}, {value: 74, children: [{value: 52, children: []}]}, {value: -24, children: []}]}, {value: 0, children: []}, {value: -9, children: [{value: -11, children: [{value: -35, children: [{value: -5, children: []}, {value: 0, children: []}]}, {value: -25, children: []}]}]}, {value: 52, children: [{value: -48, children: [{value: 8, children: []}]}, {value: -35, children: [{value: -2, children: []}, {value: 26, children: []}]}]}, {value: -23, children: [{value: 57, children: []}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'find-the-maximum-root-to-leaf-sum',
        group: 'Search',
        level: 2,
        title: 'Find the maximum root-to-leaf sum',
        fn: 'tree_find_max_root_to_leaf_sum',
        params: ['root'],
        signature: 'function tree_find_max_root_to_leaf_sum(root)',
        brief: 'Return the maximum sum of values along a path from the root to a leaf.',
        rules: ['Both endpoints contribute. Values can be negative. Return null when the tree is empty.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The best path from a node goes through the node itself and then down through one of its children. So its sum is the node’s value plus the best sum from one of the children, and which child is best is known only after asking all of them. The answer is built bottom-up, in postorder: a leaf’s best sum is its own value, and a parent takes the maximum of what its children return and adds `root.value`.\n\nThis is right because the choice below a child does not depend on anything above it: the best path from the root through child c is `root.value` plus the best path from c, whatever that path is. Values can be negative, so start the maximum at `-Infinity`, not 0. And never end a path at an inner node: a path ends at a leaf, even when the leaf lowers the sum.\n\nThe empty tree has no path at all: return `null`, and check for it before reading `root.children`.',
            example: 'The call on 2 finds a leaf and returns 2; the call on 8 returns 8. Back at the root, `best` is the maximum of −Infinity, 2 and 8, which is 8, and the result is 5 + 8 = 13, the path 5 → 8.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls on the stack, up to n on a chain.',
            pitfalls: [
                'Starting `best` at 0: a node whose children are all negative then adds 0, as if a path could stop there. For root −4 with leaves −10 and −2 the answer is −6, not −4.',
                'Taking `Math.max(root.value, root.value + best)` ends a path above a negative leaf: a path must reach a leaf.',
                'Returning 0 for the empty tree: the rules ask for `null`.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'General Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/GenTreeIntro.html#general-tree-traversals'},
        ],
        hints: ['A path may end only at a leaf, even if a negative child lowers its sum.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_find_max_root_to_leaf_sum(root)
{
    if (root === null) {
        return null;
    }
    if (root.children.length === 0) {
        return root.value;
    }
    let best = -Infinity;
    for (const child of root.children) {
        best = Math.max(best, tree_find_max_root_to_leaf_sum(child));
    }
    return root.value + best;
}`,
        solution_php: `<?php

function tree_find_max_root_to_leaf_sum($root)
{
    if ($root === null) {
        return null;
    }
    if (count($root->children) === 0) {
        return $root->value;
    }
    $best = -INF;
    foreach ($root->children as $child) {
        $best = max($best, tree_find_max_root_to_leaf_sum($child));
    }
    return $root->value + $best;
}`,
        cases: [
            {label: 'Negative children are required', args: [{value: -4, children: [{value: -10, children: []}, {value: -2, children: []}]}]},
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Best path is shallow', args: [{value: 5, children: [{value: 15, children: []}, {value: 0, children: [{value: 10, children: []}]}]}]},
            {label: 'Single negative leaf', args: [{value: -8, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 52, children: [{value: 98, children: [{value: -26, children: []}, {value: -48, children: []}]}, {value: 56, children: [{value: -46, children: [{value: 36, children: [{value: -34, children: [{value: 76, children: []}]}]}, {value: 96, children: [{value: 96, children: []}, {value: -30, children: []}, {value: 36, children: []}]}, {value: 74, children: []}]}, {value: -47, children: [{value: -19, children: [{value: -14, children: []}]}]}]}, {value: -25, children: [{value: 65, children: [{value: 97, children: []}]}, {value: 96, children: [{value: 15, children: []}, {value: -31, children: [{value: 46, children: []}]}]}, {value: 34, children: [{value: 14, children: [{value: 73, children: []}]}]}, {value: 38, children: [{value: 92, children: []}]}]}, {value: 7, children: []}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'find-parent',
        group: 'Search',
        level: 2,
        title: 'Find the parent',
        fn: 'tree_find_parent',
        params: ['root', 'uid'],
        signature: 'function tree_find_parent(root, uid)',
        brief: 'Return the parent of the node with the given uid. Return `null` for the root and for uids that are not in the tree.',
        rules: ['Return the parent node object, not its uid.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, uid: '\'c\''}},
        explanation: {
            approach: 'A node does not know its parent, but a parent knows its children. So look one level ahead: standing at a node, check the uid of each of its children. The node whose child has the uid is the answer. When the child does not match, go down into it and ask the same question there, and return the first answer that is not `null`.\n\nThis is the search of “Find a node by uid”, shifted by one level: the test is on `child.uid`, and what comes back is the node holding that child, `root`. The root is nobody’s child, so its uid is never matched, and the search for it ends with `null`, as it does for a uid that is not in the tree. Return the parent node object itself, not its uid.',
            example: 'Search for uid `\'c\'`. tree_find_parent(a) loops over its children. The first is b: its uid is not c, so the function goes down into b, which has no children and answers `null`. The second is c: its uid is c, so a holds it, and the function returns the node a. A search for `\'a\'` never meets a child with that uid and returns `null`.',
            cost: 'Time O(n) at worst: each node is compared once, as a child of its parent. Memory O(h) for the calls on the stack, up to n on a chain.',
            pitfalls: [
                'Finding the node first and then asking for its parent: these nodes have no `parent` field, and once the node is found the call that held its parent has already moved on.',
                'Starting with `if (root.uid === uid) return root` makes the root its own parent: its uid must give `null`.',
                'Returning `root.uid`, or a copy of the parent, instead of the parent node object.',
            ],
        },
        sources: [
            {title: 'Tree (abstract data type): Terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(abstract_data_type)#Terminology'},
            {title: 'Depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Depth-first_search'},
        ],
        hints: ['Look one level ahead: a node is the answer when one of its children has the uid.', 'Check the uid of each child before recursing into that child.'],
        observe: 'node',
        check: 'same_node',
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_find_parent(root, uid)
{
    for (const child of root.children) {
        if (child.uid === uid) {
            return root;
        }
        const found = tree_find_parent(child, uid);
        if (found) {
            return found;
        }
    }
    return null;
}`,
        solution_php: `<?php

function tree_find_parent($root, $uid)
{
    foreach ($root->children as $child) {
        if ($child->uid === $uid) {
            return $root;
        }
        $found = tree_find_parent($child, $uid);
        if ($found !== null) {
            return $found;
        }
    }
    return null;
}`,
        cases: [
            {label: 'A deep leaf', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'h']},
            {label: 'A child of the root', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'c']},
            {label: 'The root has no parent', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'a']},
            {label: 'A uid that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'zz']},
            {label: 'The end of a chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}, 'd']},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, 'n17']},
        ],
    },
    {
        uid: 'lowest-common-ancestor',
        group: 'Search',
        level: 3,
        title: 'Lowest common ancestor',
        fn: 'common_ancestor',
        params: ['root', 'a', 'b'],
        signature: 'function common_ancestor(root, a, b)',
        brief: 'Return the value of the deepest node whose subtree contains both target values.',
        rules: ['Node values are unique. A node counts as its own ancestor. Return null if either target is missing or the tree is empty.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, a: 2, b: 8}},
        explanation: {
            approach: 'The ancestors of a node are exactly the nodes on its path from the root. So the common ancestors of a and b are the nodes both paths share. Both paths start at the root, and every node has one parent, so the shared part is a prefix: once the two paths part, they never meet again. The deepest common ancestor is the last value of that shared prefix.\n\nThe code has two steps. First find both paths with the search of “Find a root-to-node path”; if either is `null`, a target is missing and the answer is `null`. Then walk the two arrays side by side from index 0 while their values are equal, and keep the last equal one.\n\nA node counts as its own ancestor: when a lies on the path to b, the whole path to a is shared, and the answer is a itself. The same goes for a equal to b. Comparing values is safe because the rules make them unique.',
            example: 'Take a = 2 and b = 8. The path to 2 is [5, 2] and the path to 8 is [5, 8]. At index 0 both hold 5, so `out` is 5. At index 1 they hold 2 and 8, which differ, and the walk stops. The answer is 5, the root, the only node above both.',
            cost: 'Time O(n) for the two searches, plus O(h²) for the path arrays built on the way back. Memory O(h). For many questions on one tree, preprocessing such as binary lifting answers each in O(log n).',
            pitfalls: [
                'Answering with the first value the paths do not share, or with the parent of the last shared one, is one node off: for 3 and 7, where 3 is above 7, the answer is 3 itself.',
                'Answering when a target is missing: if either path is `null`, the answer is `null`, not the root.',
                'Testing `if (out)` treats an ancestor with value 0 as “none”: only `null` means no answer.',
            ],
        },
        sources: [
            {title: 'Lowest common ancestor, Wikipedia', url: 'https://en.wikipedia.org/wiki/Lowest_common_ancestor'},
            {title: 'Lowest Common Ancestor: Binary Lifting, cp-algorithms', url: 'https://cp-algorithms.com/graph/lca_binary_lifting.html'},
        ],
        hints: ['Find both root-to-target paths. Their last shared value is the answer if both paths exist.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab', 'Tree Gym'],
        solution: `function common_ancestor(root, a, b)
{
    function path_to(current, target) {
        if (current === null) {
            return null;
        }
        if (current.value === target) {
            return [current.value];
        }
        for (const child of current.children) {
            const path = path_to(child, target);
            if (path !== null) {
                return [current.value, ...path];
            }
        }
        return null;
    }

    const left = path_to(root, a);
    const right = path_to(root, b);
    if (left === null || right === null) {
        return null;
    }
    let out = null;
    for (let i = 0, end = Math.min(left.length, right.length); i < end; ++i) {
        if (left[i] !== right[i]) {
            break;
        }
        out = left[i];
    }
    return out;
}`,
        solution_php: `<?php

function common_ancestor($root, $a, $b)
{
    $left = common_ancestor_path_to($root, $a);
    $right = common_ancestor_path_to($root, $b);
    if (($left === null) || ($right === null)) {
        return null;
    }
    $out = null;
    for ($i = 0, $end = min(count($left), count($right)); $i < $end; ++$i) {
        if ($left[$i] !== $right[$i]) {
            break;
        }
        $out = $left[$i];
    }
    return $out;
}

function common_ancestor_path_to($current, $target)
{
    if ($current === null) {
        return null;
    }
    if ($current->value === $target) {
        return [$current->value];
    }
    foreach ($current->children as $child) {
        $path = common_ancestor_path_to($child, $target);
        if ($path !== null) {
            return [$current->value, ...$path];
        }
    }
    return null;
}`,
        cases: [
            {label: 'Sibling targets', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 4, 7]},
            {label: 'One target is an ancestor', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 3, 7]},
            {label: 'Different branches', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 1, 13]},
            {label: 'Target missing', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 4, 99]},
            {label: 'Same target', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, 0, 0]},
            {label: 'Empty tree', args: [null, 0, 1]},
            {label: 'Missing first target', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}, 99, 3]},
            {label: 'Root is the second target', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}, 3, 8]},
            {label: 'Ancestor value is zero', args: [{value: 9, children: [{value: 0, children: [{value: -2, children: []}, {value: 5, children: []}]}, {value: 1, children: []}]}, -2, 5]},
            {label: 'Two siblings', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 8, 9]},
            {label: 'Cousins at different depths', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 4, 9]},
            {label: 'Nodes in different branches', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 8, 6]},
            {label: 'One is an ancestor of the other', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 2, 8]},
            {label: 'The same value twice', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 7, 7]},
            {label: 'One value is not there', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 8, -1]},
            {label: 'Down the long side', args: [{value: 1, children: [{value: 2, children: []}, {value: 3, children: [{value: 4, children: []}, {value: 5, children: [{value: 6, children: []}, {value: 7, children: [{value: 8, children: []}]}]}]}]}, 6, 8]},
            {label: '40 nodes, generated', args: [{value: 0, children: [{value: 1, children: [{value: 8, children: []}, {value: 12, children: []}, {value: 38, children: []}]}, {value: 2, children: [{value: 3, children: [{value: 7, children: [{value: 10, children: []}, {value: 14, children: [{value: 27, children: [{value: 30, children: [{value: 37, children: []}]}]}]}, {value: 26, children: []}]}, {value: 24, children: []}, {value: 25, children: []}]}, {value: 4, children: [{value: 9, children: [{value: 13, children: []}, {value: 18, children: []}]}, {value: 17, children: [{value: 31, children: []}]}, {value: 23, children: []}]}, {value: 5, children: [{value: 16, children: []}, {value: 19, children: [{value: 20, children: []}, {value: 22, children: [{value: 33, children: [{value: 36, children: []}]}]}, {value: 32, children: [{value: 34, children: []}]}]}, {value: 21, children: [{value: 28, children: []}, {value: 35, children: []}]}]}, {value: 6, children: [{value: 39, children: []}]}, {value: 11, children: []}, {value: 15, children: []}, {value: 29, children: []}]}]}, 29, 38]},
            {label: 'Two of thirty generated nodes', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: []}, {value: 4, children: [{value: 5, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, {value: 8, children: []}]}]}, {value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: []}]}]}, {value: 14, children: [{value: 15, children: [{value: 16, children: []}]}, {value: 17, children: []}]}]}, {value: 18, children: [{value: 19, children: []}, {value: 20, children: []}, {value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: []}]}]}]}, {value: 26, children: [{value: 27, children: []}]}]}]}, {value: 28, children: []}, {value: 29, children: []}]}]}, 17, 29]},
            {label: 'Along a chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}, 12, 40]},
        ],
    },
    {
        uid: 'filter',
        group: 'Search',
        level: 3,
        title: 'Filter, keeping ancestors',
        fn: 'tree_filter',
        params: ['root', 'is_match'],
        signature: 'function tree_filter(root, is_match)',
        brief: 'Return a new tree that keeps only the nodes accepted by `is_match`, plus every ancestor needed to reach them. Return `null` when nothing matches. This is the search box of a file tree.',
        rules: ['A node stays when `is_match(node)` is true, or when at least one of its descendants stays.', 'Kept nodes are copies with the same fields and a new `children` array. The input tree is left untouched.'],
        input: {text: 'A node is {uid, children}; the files of a project tree carry a size too. is_match is a function: it takes a node and returns true or false.', example: {root: {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, is_match: 'v => v.uid.endsWith(\'.md\')'}},
        explanation: {
            approach: 'Whether a node stays depends on what is under it: a folder that does not match stays only when something inside it does. So decide bottom-up, in postorder: filter the children first, then look at what came back. A node stays when `is_match(node)` is true, or when at least one of its children stayed. Otherwise it returns `null`, and its parent leaves it out.\n\nA kept node is a new object, `{...node, children: kept}`. The spread copies its fields, `uid`, `size` and any other; the new `children` array holds only the kept copies of the children, in order. So the input tree stays as it was, and no node of the result is a node of the input.\n\nA node that matches keeps only those children that stayed on their own: a match on a folder’s name keeps the folder, but not the files in it that do not match. When nothing in the whole tree matches, the root returns `null`.',
            example: 'tree_filter(docs) first filters its child. tree_filter(readme.md) has no children, so `kept` is []; the node matches, its uid ends with .md, so it returns a copy: {uid: readme.md, size: 30, children: []}. Back in docs, `kept` holds that copy. docs does not match, but a child stayed, so it returns a copy too: {uid: docs, children: [the copy of readme.md]}. The result looks like the input and is made of new objects.',
            cost: 'Time O(n), with at most one call of `is_match` per node. Memory O(h) for the calls, plus up to n new nodes when everything matches.',
            pitfalls: [
                'Deciding top-down, dropping a node that does not match before looking inside it, loses every match below it: a search for .js files drops the root folder, project, and every file with it.',
                'Returning the original node when it and all its children stay shares nodes with the input, and setting `node.children = kept` changes the input tree.',
                'Keeping every child of a matching node: the rule keeps the node, and its children only when they stay on their own.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Filter (higher-order function), Wikipedia', url: 'https://en.wikipedia.org/wiki/Filter_(higher-order_function)'},
            {title: 'Spread syntax: in object literals, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals'},
        ],
        hints: ['Decide bottom-up: filter the children first, then look at what survived.', 'A node with no surviving children that does not match returns `null`, and its parent skips it.', 'Build the copy with `{...root, children}`.'],
        observe: 'result',
        check: 'fresh_nodes',
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_filter(root, is_match)
{
    const children = [];
    for (const child of root.children) {
        const kept = tree_filter(child, is_match);
        if (kept) {
            children.push(kept);
        }
    }
    if ((children.length === 0) && !is_match(root)) {
        return null;
    }
    return {...root, children};
}`,
        solution_php: null,
        php_note: 'its tests pass JavaScript functions as arguments',
        cases: [
            {label: 'Only .js files', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: 'v => v.uid.endsWith(\'.js\')'}]},
            {label: 'One folder by name', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: 'v => v.uid === \'docs\''}]},
            {label: 'Nothing matches', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: 'v => v.uid === \'nope\''}]},
            {label: 'Everything matches', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: '() => true'}]},
            {label: 'Files larger than 90', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: 'v => v.size > 90'}]},
            {label: 'Only the root matches', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, {$fn: 'v => v.uid === \'a\''}]},
            {label: 'Two leaves in different branches', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, {$fn: 'v => [\'i\', \'f\'].includes(v.uid)'}]},
        ],
    },
    {
        uid: 'clone',
        group: 'Transformations',
        level: 1,
        title: 'Clone the tree',
        fn: 'tree_clone',
        params: ['root'],
        signature: 'function tree_clone(root)',
        brief: 'Return a deep copy of the tree: the same shape and fields, but no node object shared with the original.',
        rules: [],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'A deep copy of a tree is a new root node whose children are deep copies of the original children. That definition is already the recursion: copy the node, then clone each child the same way. The leaves end it: a leaf’s `children` is empty, and mapping an empty array returns a new empty array without another call.\n\n`{...root}` makes a shallow copy: a new object with the same own fields. That is right for `uid`, `size` and other plain values, but its `children` would still be the original array, holding the original nodes. So the copy spreads the node and replaces `children` with a new array, built by `map` over the original children with `tree_clone`. The result has the same shape and fields, and shares no node and no `children` array with the input.\n\nIn real code `structuredClone(root)` does all of this in one call. Writing it by hand is the exercise: it is the shape of every tree transformation that follows.',
            example: 'tree_clone(a) spreads a into a new object, {uid: a}, and maps its children. tree_clone(b) makes {uid: b} and maps b’s empty `children` into a new empty array; the same for c. The root copy gets the new array [copy of b, copy of c]. It prints like the input, but the copy is not the object a, its `children` is not a’s array, and renaming the copy of b leaves b as it was.',
            cost: 'Time O(n). Memory O(n) for the copy, plus O(h) for the calls on the stack.',
            pitfalls: [
                '`{...root}` or `Object.assign({}, root)` alone copies one level: the `children` array and every node below the root are still shared, and a change to the clone shows up in the original.',
                'Building `{uid: root.uid, children: ...}` by hand drops the other fields, such as the `size` of a file.',
                '`JSON.parse(JSON.stringify(root))` passes here, but in real trees it drops `undefined` fields and functions, turns dates into strings and throws on parent links.',
            ],
        },
        sources: [
            {title: 'Object copying: Deep copy, Wikipedia', url: 'https://en.wikipedia.org/wiki/Object_copying#Deep_copy'},
            {title: 'Spread syntax: in object literals, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals'},
            {title: 'structuredClone(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone'},
        ],
        hints: ['Copy the own fields of the node, then replace `children` with clones of the children.', '`{...root, children: root.children.map(v => tree_clone(v))}` is the whole function.'],
        observe: 'result',
        check: 'fresh_nodes',
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_clone(root)
{
    return {...root, children: root.children.map(v => tree_clone(v))};
}`,
        solution_php: `<?php

function tree_clone($root)
{
    $out = clone $root;
    $out->children = array_map('tree_clone', $root->children);
    return $out;
}`,
        cases: [
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'Nodes with extra fields', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: []}, {uid: 'n3', children: [{uid: 'n11', children: [{uid: 'n22', children: [{uid: 'n30', children: [{uid: 'n42', children: [{uid: 'n68', children: []}]}]}, {uid: 'n59', children: [{uid: 'n64', children: [{uid: 'n72', children: []}, {uid: 'n103', children: []}]}, {uid: 'n108', children: []}, {uid: 'n110', children: []}]}, {uid: 'n76', children: []}]}, {uid: 'n60', children: []}]}, {uid: 'n17', children: [{uid: 'n18', children: [{uid: 'n28', children: [{uid: 'n44', children: []}]}, {uid: 'n34', children: [{uid: 'n86', children: []}, {uid: 'n88', children: []}]}, {uid: 'n41', children: []}]}, {uid: 'n31', children: [{uid: 'n33', children: []}, {uid: 'n100', children: []}]}, {uid: 'n51', children: [{uid: 'n56', children: [{uid: 'n69', children: [{uid: 'n95', children: []}]}, {uid: 'n91', children: []}]}]}, {uid: 'n55', children: []}, {uid: 'n93', children: []}]}]}, {uid: 'n4', children: [{uid: 'n10', children: [{uid: 'n49', children: []}]}, {uid: 'n20', children: [{uid: 'n71', children: []}]}, {uid: 'n25', children: [{uid: 'n43', children: []}, {uid: 'n98', children: []}]}, {uid: 'n38', children: [{uid: 'n74', children: [{uid: 'n80', children: [{uid: 'n84', children: []}]}]}, {uid: 'n87', children: []}]}, {uid: 'n50', children: [{uid: 'n57', children: [{uid: 'n89', children: [{uid: 'n113', children: []}]}]}]}, {uid: 'n53', children: [{uid: 'n66', children: [{uid: 'n73', children: [{uid: 'n82', children: [{uid: 'n97', children: []}, {uid: 'n117', children: []}]}]}, {uid: 'n109', children: []}]}]}, {uid: 'n107', children: [{uid: 'n119', children: []}]}]}, {uid: 'n5', children: [{uid: 'n9', children: [{uid: 'n23', children: [{uid: 'n32', children: [{uid: 'n70', children: []}, {uid: 'n111', children: []}]}]}, {uid: 'n47', children: [{uid: 'n58', children: []}]}]}, {uid: 'n77', children: []}, {uid: 'n102', children: []}]}, {uid: 'n6', children: [{uid: 'n7', children: [{uid: 'n12', children: [{uid: 'n79', children: []}, {uid: 'n114', children: []}, {uid: 'n115', children: []}]}, {uid: 'n19', children: [{uid: 'n29', children: [{uid: 'n35', children: []}]}]}, {uid: 'n63', children: []}, {uid: 'n75', children: []}]}, {uid: 'n8', children: [{uid: 'n14', children: [{uid: 'n15', children: []}, {uid: 'n21', children: [{uid: 'n61', children: []}]}, {uid: 'n45', children: []}]}]}, {uid: 'n24', children: [{uid: 'n27', children: []}, {uid: 'n39', children: [{uid: 'n52', children: []}]}, {uid: 'n65', children: [{uid: 'n85', children: []}, {uid: 'n92', children: [{uid: 'n104', children: []}]}]}, {uid: 'n81', children: [{uid: 'n99', children: []}, {uid: 'n105', children: [{uid: 'n118', children: []}]}]}, {uid: 'n94', children: []}]}, {uid: 'n26', children: [{uid: 'n37', children: [{uid: 'n83', children: [{uid: 'n96', children: []}]}, {uid: 'n90', children: [{uid: 'n116', children: []}]}]}, {uid: 'n46', children: []}, {uid: 'n78', children: []}]}, {uid: 'n101', children: []}]}, {uid: 'n16', children: [{uid: 'n36', children: []}, {uid: 'n54', children: []}, {uid: 'n67', children: []}]}, {uid: 'n62', children: [{uid: 'n112', children: []}]}]}, {uid: 'n13', children: [{uid: 'n40', children: [{uid: 'n48', children: [{uid: 'n106', children: []}]}]}]}]}]},
        ],
    },
    {
        uid: 'scale-every-value',
        group: 'Transformations',
        level: 2,
        title: 'Scale every value',
        fn: 'scale_tree',
        params: ['root', 'factor'],
        signature: 'function scale_tree(root, factor)',
        brief: 'Return a new tree with the same shape and child order, multiplying each value by factor.',
        rules: ['Keep the input unchanged. Return null for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, factor: 2}},
        explanation: {
            approach: 'This is a tree transformation of the simplest kind: each output node depends only on its own input node. So the result is built node for node: a new node whose `value` is the old value × factor, and whose `children` are the scaled children, in the same order. `map` over `root.children` gives exactly that: one result per child, in order, in a new array.\n\nBuilding new nodes is what keeps the input unchanged. Multiplying `root.value` in place would be shorter, and would scale the caller’s tree too, which the rules forbid.\n\nThe shape never changes, whatever the factor: with factor 0 every value becomes 0 and every node is still there. The empty tree, `null`, scales to `null`.',
            example: 'Take factor 2. scale_tree on 5 makes a node with value 5 × 2 = 10 and maps its children: the call on 2 gives {value: 4, children: []} and the call on 8 gives {value: 16, children: []}. The result is 10 with the children 4 and 16, and the input still reads 5, 2 and 8.',
            cost: 'Time O(n), one multiplication per node. Memory O(n) for the new tree, plus O(h) for the calls on the stack.',
            pitfalls: [
                'Changing `root.value` in place scales the input: the test sees the arguments changed, and a second call scales them again.',
                '`root.children.map(scale_tree)` passes each child’s index as the factor: the first child is multiplied by 0, the second by 1. Pass a callback, `v => scale_tree(v, factor)`.',
                'Reading `root.value` before checking for `null` throws on the empty tree.',
            ],
        },
        sources: [
            {title: 'Map (higher-order function), Wikipedia', url: 'https://en.wikipedia.org/wiki/Map_(higher-order_function)'},
            {title: 'Array.prototype.map(): Using parseInt() with map(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#using_parseint_with_map'},
        ],
        hints: ['Build a new object for each node. Array.map can build the new children array.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function scale_tree(root, factor)
{
    if (root === null) {
        return null;
    }
    return {
        value: root.value * factor,
        children: root.children.map(v => scale_tree(v, factor)),
    };
}`,
        solution_php: `<?php

function scale_tree($root, $factor)
{
    if ($root === null) {
        return null;
    }
    return (object) [
        'value' => $root->value * $factor,
        'children' => array_map(fn ($v) => scale_tree($v, $factor), $root->children),
    ];
}`,
        cases: [
            {label: 'Multiply by two', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 2]},
            {label: 'Multiply by a negative', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}, -3]},
            {label: 'Multiply by zero', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, 0]},
            {label: 'Empty tree', args: [null, 2]},
            {label: 'Fractional multiplier', args: [{value: 6, children: [{value: -2, children: []}, {value: 1, children: []}]}, 0.5]},
            {label: 'Unit multiplier', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}, 1]},
            {label: 'Scale a single leaf', args: [{value: -3, children: []}, 3]},
            {label: 'Thirty nodes, times three', args: [{value: 68, children: [{value: 10, children: [{value: 11, children: []}, {value: 28, children: []}]}, {value: -16, children: [{value: 75, children: [{value: 15, children: [{value: 62, children: [{value: 53, children: [{value: -31, children: []}]}]}, {value: 97, children: []}, {value: 73, children: []}]}, {value: -43, children: []}]}, {value: -9, children: []}]}, {value: 0, children: [{value: -23, children: [{value: 33, children: []}]}, {value: -34, children: [{value: -21, children: [{value: 99, children: [{value: -43, children: [{value: 38, children: []}, {value: 22, children: []}]}]}, {value: 31, children: [{value: 50, children: [{value: 39, children: [{value: 38, children: []}]}]}]}, {value: 24, children: []}]}]}, {value: -10, children: []}]}, {value: 46, children: []}]}, 3]},
        ],
    },
    {
        uid: 'prune-matching-branches',
        group: 'Transformations',
        level: 2,
        title: 'Prune matching branches',
        fn: 'prune_tree',
        params: ['root', 'minimum'],
        signature: 'function prune_tree(root, minimum)',
        brief: 'Remove every node whose value is below minimum, along with all of its descendants.',
        rules: ['Return the remaining tree in its original child order. Keep the input unchanged. Return null if the root is removed or already null.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, minimum: 5}},
        explanation: {
            approach: 'A node below minimum goes, and everything under it goes with it, whatever their values. So the decision about a node comes before its children are looked at, on the way down: if `root.value < minimum`, return `null` at once and never visit that subtree.\n\nA node that stays becomes a new node with the same value. Its children are the pruned children, in order, leaving out each one that came back `null`. This is a preorder walk with an early stop: the check on the way down cuts the walk short, and the survivors are collected on the way back up.\n\nA value equal to minimum is not below it, so it stays. When the root itself is below minimum, the whole tree goes: return `null`, as for the empty tree.',
            example: 'Take minimum 5. prune_tree on 5: 5 is not below 5, so the node stays, and the function prunes its children. The call on 2: 2 < 5, so it returns `null` and is left out. The call on 8: 8 stays and has no children, {value: 8, children: []}. The result is 5 with the one child 8.',
            cost: 'Time O(n) at worst, when everything stays; a removed node costs one comparison, and its subtree is never visited. Memory O(h) for the calls, plus the kept copy.',
            pitfalls: [
                'Pruning bottom-up, or only at the leaves, keeps a high value whose parent was removed: in 10 → 4 → 99 with minimum 5, 99 goes with 4.',
                'Testing with `<=` drops the values equal to minimum, which stay.',
                'Removing children with `splice` inside the loop over `root.children` changes the input and skips the child after each removal.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'General Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/GenTreeIntro.html#general-tree-traversals'},
        ],
        hints: ['Decide whether to keep the current node before visiting its children. A removed branch contributes no nodes.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function prune_tree(root, minimum)
{
    if ((root === null) || (root.value < minimum)) {
        return null;
    }
    const children = [];
    for (const child of root.children) {
        const kept = prune_tree(child, minimum);
        if (kept !== null) {
            children.push(kept);
        }
    }
    return {value: root.value, children};
}`,
        solution_php: `<?php

function prune_tree($root, $minimum)
{
    if (($root === null) || ($root->value < $minimum)) {
        return null;
    }
    $children = [];
    foreach ($root->children as $child) {
        $kept = prune_tree($child, $minimum);
        if ($kept !== null) {
            $children[] = $kept;
        }
    }
    return (object) ['value' => $root->value, 'children' => $children];
}`,
        cases: [
            {label: 'Keep some branches', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 6]},
            {label: 'Remove the root', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 9]},
            {label: 'Keep everything', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}, -10]},
            {label: 'Empty tree', args: [null, 0]},
            {label: 'Keep the threshold value', args: [{value: 2, children: [{value: 2, children: []}, {value: 1, children: []}, {value: 3, children: []}]}, 2]},
            {label: 'Drop high values under a removed parent', args: [{value: 10, children: [{value: 4, children: [{value: 99, children: []}]}, {value: 7, children: []}]}, 5]},
            {label: 'Pruning leaves only the root', args: [{value: 0, children: [{value: -1, children: []}, {value: -2, children: []}]}, 0]},
            {label: 'Thirty nodes, at least -20', args: [{value: -5, children: [{value: -18, children: [{value: 6, children: [{value: -21, children: [{value: 88, children: [{value: 82, children: []}, {value: 6, children: []}, {value: 12, children: []}]}, {value: 20, children: [{value: 96, children: [{value: 35, children: [{value: 3, children: [{value: -5, children: []}]}]}]}, {value: 35, children: []}]}, {value: 28, children: []}, {value: -23, children: [{value: 82, children: []}, {value: 22, children: []}]}]}, {value: 85, children: []}, {value: 13, children: [{value: 71, children: []}]}]}, {value: -3, children: [{value: -11, children: []}]}]}, {value: -36, children: [{value: 8, children: [{value: -21, children: []}, {value: -31, children: []}]}, {value: 65, children: []}, {value: -3, children: []}]}, {value: 73, children: []}]}, -20]},
        ],
    },
    {
        uid: 'remove-one-layer-of-leaves',
        group: 'Transformations',
        level: 2,
        title: 'Remove one layer of leaves',
        fn: 'tree_remove_leaves',
        params: ['root'],
        signature: 'function tree_remove_leaves(root)',
        brief: 'Return a tree with every original leaf removed. Remove exactly one layer of leaves.',
        rules: ['Keep newly exposed leaves and the original child order. Keep the input unchanged. An empty tree or a single root returns null.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'A leaf is a node with no children. The task removes the leaves of the original tree, once: a parent whose children were all leaves becomes a leaf in the result, and it stays. So the question “is this a leaf?” is asked of the input node, before its children are processed: when `root.children.length === 0`, the node goes, and the call returns `null`.\n\nAny other node stays, as a new node with the same value. Its children are the results of the same call on each child, without the `null`s, in order. A node whose children were all leaves ends up with `children: []`.\n\nThe root follows the same rule: a single node is a leaf, so a one-node tree returns `null`, as the empty tree does.',
            example: 'tree_remove_leaves on 5: 5 has children, so it stays, and the function processes them. 2 has no children: it was a leaf, the call returns `null`, and it is left out. The same for 8. The result is {value: 5, children: []}. 5 is a leaf now, but it was not one in the input, so it stays.',
            cost: 'Time O(n). Memory O(h) for the calls, plus the new tree.',
            pitfalls: [
                'Checking for a leaf after processing the children looks at the new node: a parent that just lost its leaves looks like a leaf and goes too, layer after layer. The chain 9 → 5 → 2 → 0 must become 9 → 5 → 2, not `null`.',
                'Keeping the `null` of a removed child, as `map` alone does, leaves arrays such as `[null, null]` in `children`.',
                'Removing the leaves in place, with `splice` or by assigning a filtered array to `children`, changes the input tree.',
            ],
        },
        sources: [
            {title: 'Tree (abstract data type): Terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(abstract_data_type)#Terminology'},
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
        ],
        hints: ['Check whether a node was originally a leaf before processing its children.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_remove_leaves(root)
{
    if ((root === null) || (root.children.length === 0)) {
        return null;
    }
    const children = [];
    for (const child of root.children) {
        const kept = tree_remove_leaves(child);
        if (kept !== null) {
            children.push(kept);
        }
    }
    return {value: root.value, children};
}`,
        solution_php: `<?php

function tree_remove_leaves($root)
{
    if (($root === null) || (count($root->children) === 0)) {
        return null;
    }
    $children = [];
    foreach ($root->children as $child) {
        $kept = tree_remove_leaves($child);
        if ($kept !== null) {
            $children[] = $kept;
        }
    }
    return (object) ['value' => $root->value, 'children' => $children];
}`,
        cases: [
            {label: 'Internal parents become leaves', args: [{value: 8, children: [{value: 9, children: []}, {value: 1, children: [{value: 2, children: [{value: 3, children: []}]}]}, {value: 4, children: [{value: 5, children: []}]}]}]},
            {label: 'One layer comes off a chain', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Wide tree leaves only the root', args: [{value: 50, children: [{value: 8, children: []}, {value: 6, children: []}, {value: 7, children: []}, {value: 5, children: []}, {value: 3, children: []}, {value: 0, children: []}]}]},
            {label: 'Repeated values still have distinct roles', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}]},
            {label: 'Only a leaf', args: [{value: 6, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: 5, children: [{value: 68, children: [{value: 4, children: [{value: -13, children: [{value: 69, children: [{value: 67, children: []}, {value: 34, children: []}]}]}]}, {value: -48, children: [{value: 67, children: [{value: 72, children: [{value: 17, children: [{value: 65, children: []}]}]}]}, {value: -43, children: []}]}, {value: 79, children: [{value: 16, children: [{value: 82, children: [{value: 65, children: [{value: 23, children: [{value: 14, children: []}]}, {value: 13, children: []}, {value: 20, children: []}, {value: 14, children: []}]}]}, {value: -36, children: [{value: 23, children: []}, {value: 19, children: []}]}]}]}, {value: 92, children: [{value: -47, children: []}, {value: -30, children: []}]}]}, {value: 77, children: [{value: 26, children: []}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'sort-siblings-by-value',
        group: 'Transformations',
        level: 2,
        title: 'Sort siblings by value',
        fn: 'tree_sort_children',
        params: ['root'],
        signature: 'function tree_sort_children(root)',
        brief: 'Return a tree whose siblings are sorted by numeric value from smallest to largest at every level.',
        rules: ['Preserve the original order among children with equal values. Keep the input unchanged. Return null for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'Sorting siblings never moves a node to another parent: each `children` array is sorted on its own, and a node takes its whole subtree with it. So the job is the same at every node: build the new children, the sorted copies of the original children, and sort that new array by `value`.\n\nTwo details make it right. The array to sort must be a new one, from `map`, because `sort` works in place, and sorting `root.children` would reorder the input. And the comparator must be numeric, `(a, b) => a.value - b.value`: a negative number puts a first, a positive one puts b first, and 0 leaves the two as they are.\n\nEqual values keep their original order because `Array.prototype.sort` is stable, which every engine guarantees since ES2019, as long as the comparator returns 0 for them. The empty tree gives `null`.',
            example: 'tree_sort_children on 5 first maps its children: the call on 2 gives {value: 2, children: []} and the call on 8 gives {value: 8, children: []}. Then it sorts the new array [2, 8] by value: 2 − 8 is negative, so 2 comes first, and the order stays. The result is 5 with the children 2 and 8, as in the input, but built from new nodes.',
            cost: 'Time O(n log n) at worst: a node with k children sorts them in O(k log k), and the k of all the nodes add up to n − 1. Memory O(n) for the new tree, plus O(h) for the calls.',
            pitfalls: [
                '`sort()` with no comparator compares strings, and every node turns into the same string, `"[object Object]"`: nothing moves.',
                'Sorting `root.children` itself reorders the input tree; sort the new array that `map` returned.',
                'A comparator that returns a boolean, `a.value > b.value`, never returns a negative number: engines may leave the array out of order.',
            ],
        },
        sources: [
            {title: 'Sorting algorithm: Stability, Wikipedia', url: 'https://en.wikipedia.org/wiki/Sorting_algorithm#Stability'},
            {title: 'Array.prototype.sort(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'},
        ],
        hints: ['Create a new children array first. Sort that array using a numeric comparator.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_sort_children(root)
{
    if (root === null) {
        return null;
    }
    const children = root.children.map(tree_sort_children);
    children.sort(compare_values);
    return {value: root.value, children};
    function compare_values(a, b) {
        return a.value - b.value;
    }
}`,
        solution_php: `<?php

function tree_sort_children($root)
{
    if ($root === null) {
        return null;
    }
    $children = array_map('tree_sort_children', $root->children);
    usort($children, fn ($a, $b) => $a->value <=> $b->value);
    return (object) ['value' => $root->value, 'children' => $children];
}`,
        cases: [
            {label: 'Sort more than one level', args: [{value: 8, children: [{value: 4, children: []}, {value: 1, children: [{value: 7, children: []}, {value: 3, children: []}]}]}]},
            {label: 'Equal siblings keep their order', args: [{value: 0, children: [{value: 2, children: [{value: 8, children: []}]}, {value: 1, children: []}, {value: 2, children: [{value: 3, children: []}]}]}]},
            {label: 'Numeric order across signs', args: [{value: 1, children: [{value: 10, children: []}, {value: -9, children: []}, {value: 2, children: []}, {value: 0, children: []}]}]},
            {label: 'Already sorted chain', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Single node', args: [{value: 4, children: []}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Thirty nodes, generated', args: [{value: -2, children: [{value: -24, children: [{value: 0, children: [{value: -24, children: [{value: 97, children: [{value: -41, children: [{value: 53, children: []}, {value: -48, children: []}, {value: 56, children: []}]}, {value: 67, children: [{value: 86, children: []}]}]}]}]}, {value: 7, children: [{value: -5, children: []}]}, {value: 24, children: []}]}, {value: -1, children: [{value: -31, children: [{value: 86, children: [{value: 62, children: [{value: 67, children: [{value: 28, children: []}]}]}]}]}]}, {value: 51, children: [{value: 84, children: [{value: 27, children: []}]}, {value: -1, children: [{value: 55, children: []}, {value: 81, children: []}, {value: -9, children: []}]}, {value: -43, children: [{value: 56, children: []}, {value: 98, children: []}]}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'trim-the-tree-to-a-depth',
        group: 'Transformations',
        level: 2,
        title: 'Trim the tree to a depth',
        fn: 'tree_limit_depth',
        params: ['root', 'depth'],
        signature: 'function tree_limit_depth(root, depth)',
        brief: 'Copy nodes through depth, discarding nodes below that level.',
        rules: ['Depth starts at zero. Preserve child order and keep the input unchanged. Return null for a null root or an invalid depth.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, depth: 0}},
        explanation: {
            approach: 'The depth of a node is the number of edges from the root to it: the root is at depth 0, its children at 1. Keeping nodes “through depth” means keeping every node whose depth is at most `depth`. The recursion does not need to know absolute depths: give each call the depth still left under its node. Each child is called with `depth - 1`, and a call that gets 0 keeps its node with `children: []` and goes no deeper.\n\nThis is a depth-limited search: the walk that copies a tree, with a counter that runs down by one per level and stops the walk at zero. The kept nodes are new objects, so the input stays as it was.\n\nThe rules also ask for `null` when `depth` is not a level at all: a negative number, or one that is not whole. Check it at the start, with `Number.isInteger(depth)` and `depth < 0`, along with the `null` root.',
            example: 'Take depth 0. tree_limit_depth on 5 finds the depth valid, copies 5, and with no room left does not look at the children: the result is {value: 5, children: []}. With depth 1 the root has room for one level: the calls on 2 and 8 get depth 0 and copy their leaves, and the result is 5 with the children 2 and 8, a full copy, since this tree has no level 2.',
            cost: 'Time O(k), k the number of nodes kept: the walk never goes below the limit. Memory O(min(depth, h)) for the calls, plus the copy.',
            pitfalls: [
                'Off by one: depth 0 keeps the root alone and 1 keeps the root with its children. Counting levels from 1 keeps one level too few.',
                'Giving a node at the limit its original `children` keeps everything below it, and shares those nodes with the input.',
                'Stopping only when `depth === 0`: a negative depth counts on down past it, −2, −3…, and copies the whole tree instead of returning `null`.',
            ],
        },
        sources: [
            {title: 'Iterative deepening depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Iterative_deepening_depth-first_search'},
            {title: 'Tree (abstract data type): Terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(abstract_data_type)#Terminology'},
        ],
        hints: ['When the remaining depth is zero, keep the current node with an empty children array.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_limit_depth(root, depth)
{
    if ((root === null) || !Number.isInteger(depth) || (depth < 0)) {
        return null;
    }
    const children = [];
    if (depth > 0) {
        for (const child of root.children) {
            children.push(tree_limit_depth(child, depth - 1));
        }
    }
    return {value: root.value, children};
}`,
        solution_php: `<?php

function tree_limit_depth($root, $depth)
{
    if (($root === null) || !is_int($depth) || ($depth < 0)) {
        return null;
    }
    $children = [];
    if ($depth > 0) {
        foreach ($root->children as $child) {
            $children[] = tree_limit_depth($child, $depth - 1);
        }
    }
    return (object) ['value' => $root->value, 'children' => $children];
}`,
        cases: [
            {label: 'Keep the root and its children', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 1]},
            {label: 'Zero keeps the root', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}, 0]},
            {label: 'Beyond the last level', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, 8]},
            {label: 'Invalid negative limit', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, -1]},
            {label: 'Empty tree', args: [null, 2]},
            {label: 'Thirty nodes, two levels down', args: [{value: 67, children: [{value: -45, children: [{value: -21, children: [{value: 37, children: [{value: 34, children: []}, {value: 74, children: []}]}, {value: 43, children: []}, {value: 55, children: []}, {value: -32, children: [{value: -4, children: []}, {value: -36, children: []}, {value: 53, children: []}, {value: 29, children: []}]}, {value: -41, children: []}, {value: 19, children: []}]}, {value: -14, children: [{value: 56, children: []}]}]}, {value: -26, children: [{value: -8, children: [{value: 24, children: []}]}, {value: -22, children: [{value: 62, children: []}]}]}, {value: -2, children: [{value: 27, children: [{value: 42, children: [{value: 66, children: []}, {value: 39, children: [{value: 22, children: []}]}]}]}]}, {value: -23, children: []}, {value: 55, children: []}]}, 2]},
            {label: 'A chain of fifty cut at ten', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}, 10]},
        ],
    },
    {
        uid: 'map',
        group: 'Transformations',
        level: 2,
        title: 'Map every node',
        fn: 'tree_map',
        params: ['root', 'fn'],
        signature: 'function tree_map(root, fn)',
        brief: 'Return a new tree with the same shape, where every node was produced by `fn`.',
        rules: ['Call `fn(node, depth)` once per node. The root has depth 0.', '`fn` returns the own fields of the new node. Add `children`, holding the mapped children, to that object.'],
        input: {text: 'A node is {uid, children}. fn is a function: fn(node, depth) returns the own fields of the new node, without children.', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, fn: '(node, depth) => ({uid: node.uid, depth})'}},
        explanation: {
            approach: '`map` on an array makes a new array with one result per item, in order. `tree_map` does the same for a tree: one new node per node, in the same shape. The new node is the object `fn(node, depth)` returns, with the fields it chose, and the function adds `children` to it: the mapped children of the original node, in order.\n\nThe depth is state that flows down: the root has depth 0, and the children of a node are one deeper than it. `tree_map` takes only `(root, fn)`, so the recursion goes in a helper that takes `(node, depth)` and calls itself on each child with `depth + 1`.\n\nThe new node holds only what `fn` returned, plus `children`. The fields of the original node are not copied: `fn` decides which of them the new node keeps. Call `fn` exactly once per node.',
            example: 'The helper starts at a with depth 0: fn(a, 0) returns {uid: a, depth: 0}, and the helper gives it `children` by mapping a’s children at depth 1. fn(b, 1) returns {uid: b, depth: 1}, and b has no children, so its `children` is []. The same for c. The result is {uid: a, depth: 0, children: [{uid: b, depth: 1, children: []}, {uid: c, depth: 1, children: []}]}.',
            cost: 'Time O(n), plus the n calls of `fn`. Memory O(n) for the new tree, plus O(h) for the calls on the stack.',
            pitfalls: [
                'Spreading the original node into the result, `{...node, ...fn(node, depth)}`, adds fields `fn` did not return, such as the `size` of a file.',
                '`node.children.map(helper)` passes each child’s index as its depth: the first child gets 0, the second 1.',
                'Calling `fn(node)` without the depth, or starting the root at 1, makes every depth `undefined` or one too high.',
            ],
        },
        sources: [
            {title: 'Map (higher-order function): Generalization, Wikipedia', url: 'https://en.wikipedia.org/wiki/Map_(higher-order_function)#Generalization'},
            {title: 'Array.prototype.map(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'},
        ],
        hints: ['The depth is state that flows down: a helper that takes `(node, depth)` calls itself with `depth + 1`.', '`const out = fn(node, depth);` then fill `out.children` from `node.children.map(...)`.'],
        observe: 'result',
        check: 'fresh_nodes',
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_map(root, fn)
{
    return subtree_map(root, 0);
    function subtree_map(node, depth) {
        const out = fn(node, depth);
        out.children = node.children.map(v => subtree_map(v, depth + 1));
        return out;
    }
}`,
        solution_php: null,
        php_note: 'its tests pass JavaScript functions as arguments',
        cases: [
            {label: 'Add an upper-case title', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, {$fn: 'v => ({uid: v.uid, title: v.uid.toUpperCase()})'}]},
            {label: 'Record the depth', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, {$fn: '(node, depth) => ({uid: node.uid, depth})'}]},
            {label: 'Flag the files', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}, {$fn: 'v => ({uid: v.uid, is_file: v.children.length === 0})'}]},
            {label: 'A single node', args: [{uid: 'a', children: []}, {$fn: '(node, depth) => ({uid: `${node.uid}${depth}`})'}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, {$fn: '(node, depth) => ({uid: node.uid, depth})'}]},
        ],
    },
    {
        uid: 'sizes',
        group: 'Transformations',
        level: 2,
        title: 'Total the sizes',
        fn: 'size_by_uid_from_tree',
        params: ['root'],
        signature: 'function size_by_uid_from_tree(root)',
        brief: 'Return an object that maps every node uid to the total size of its subtree, like a disk-usage report.',
        rules: ['The total of a node is its own `size`, or 0 when it has none, plus the totals of its children.'],
        input: {text: 'A node is {uid, children}; it may carry a size, a number. A node with no size counts as 0.', example: {root: {uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'index.html', size: 60, children: []}]}}},
        explanation: {
            approach: 'The total of a node is its own `size`, or 0, plus the totals of its children, and each of those is the total of a whole subtree. A parent needs the totals of its children first: a postorder job, like the disk-usage command du, which reports a folder after the files in it.\n\nOne walk does it all if the helper both returns and records. It returns the total of its subtree, so the parent can add it up, and it stores the same number in `out[node.uid]` on the way back up. `node.size || 0` covers the nodes with no size, which count as 0. A folder may carry a size of its own too, and it adds to its children’s totals.\n\nEvery node gets an entry, leaves and empty folders too: an empty folder with no size reports 0.',
            example: 'The helper starts at src: src has no size, so its total starts at 0. It measures app.js: no children, so out[app.js] = 420, and 420 comes back; src’s total is 420. Then index.html: out[index.html] = 60, and the total is 480. After the loop, out[src] = 480. The result is {app.js: 420, index.html: 60, src: 480}, the files stored before their folder, in postorder.',
            cost: 'Time O(n): each node is measured once, and its total is reused by its parent. Memory O(n) for the result, plus O(h) for the calls. A separate walk for each node’s total would cost O(n × h).',
            pitfalls: [
                'Adding `node.size` with no fallback: a node with no size adds `undefined`, the total becomes NaN, and NaN spreads to every folder above it.',
                'Storing the total before the loop over the children stores the node’s own size alone.',
                'Leaving out a folder’s own size: with sizes on folders too, a (100) over b (10) over c (2), and d (1), totals 113 for a.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'du (Unix), Wikipedia', url: 'https://en.wikipedia.org/wiki/Du_(Unix)'},
            {title: 'Recursion (computer science): Filesystem traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Recursion_(computer_science)#Filesystem_traversal'},
        ],
        hints: ['A parent needs the totals of its children first, so this is a post-order job.', 'Let the recursive helper return the subtree total and also store it in `out[node.uid]`.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function size_by_uid_from_tree(root)
{
    const out = {};
    subtree_measure(root);
    return out;
    function subtree_measure(node) {
        let total = node.size || 0;
        for (const child of node.children) {
            total += subtree_measure(child);
        }
        out[node.uid] = total;
        return total;
    }
}`,
        solution_php: `<?php

function size_by_uid_from_tree($root)
{
    $out = [];
    size_by_uid_from_tree_measure($root, $out);
    return $out;
}

function size_by_uid_from_tree_measure($node, &$out)
{
    $total = $node->size ?? 0;
    foreach ($node->children as $child) {
        $total += size_by_uid_from_tree_measure($child, $out);
    }
    $out[$node->uid] = $total;
    return $total;
}`,
        cases: [
            {label: 'A project folder', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}]},
            {label: 'A single file', args: [{uid: 'notes.txt', size: 5, children: []}]},
            {label: 'No sizes anywhere', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'Sizes on folders too', args: [{uid: 'a', size: 100, children: [{uid: 'b', size: 10, children: [{uid: 'c', size: 2, children: []}]}, {uid: 'd', size: 1, children: []}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n4', children: [{uid: 'n16', children: [], size: 69}, {uid: 'n24', children: [], size: 33}]}, {uid: 'n10', children: [{uid: 'n32', children: [], size: 12}]}, {uid: 'n30', children: [], size: 90}]}]}, {uid: 'n3', children: [{uid: 'n6', children: [{uid: 'n15', children: [{uid: 'n17', children: [], size: 34}], size: 92}, {uid: 'n25', children: [], size: 94}]}, {uid: 'n8', children: [{uid: 'n9', children: [{uid: 'n35', children: [], size: 41}]}, {uid: 'n11', children: [], size: 56}, {uid: 'n12', children: [{uid: 'n27', children: [{uid: 'n28', children: [{uid: 'n39', children: [], size: 7}]}]}]}, {uid: 'n13', children: [{uid: 'n33', children: [{uid: 'n34', children: [], size: 54}, {uid: 'n38', children: [], size: 51}], size: 33}, {uid: 'n36', children: [], size: 23}]}, {uid: 'n37', children: [], size: 98}], size: 23}, {uid: 'n26', children: [{uid: 'n31', children: [], size: 70}]}]}, {uid: 'n5', children: [{uid: 'n7', children: [{uid: 'n29', children: [], size: 49}], size: 98}, {uid: 'n18', children: [{uid: 'n23', children: [], size: 40}], size: 10}, {uid: 'n21', children: [], size: 62}]}, {uid: 'n14', children: [{uid: 'n19', children: [], size: 19}, {uid: 'n20', children: [], size: 69}]}, {uid: 'n22', children: [], size: 42}]}]},
        ],
    },
    {
        uid: 'compute-subtree-sums',
        group: 'Transformations',
        level: 3,
        title: 'Compute subtree sums',
        fn: 'subtree_sums',
        params: ['root'],
        signature: 'function subtree_sums(root)',
        brief: 'Return a tree with the same shape. Each new value is the sum of that node’s original value and all of its descendants.',
        rules: ['Preserve child order and keep the input unchanged. Return null for an empty tree.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {
            approach: 'The subtree of a node is the node and all its descendants, so its sum is the node’s own value plus the sums of its children’s subtrees. That one sentence is the whole algorithm, and it gives the order of work: the children first, then the node, postorder.\n\nBuild the new children first, with the same function. Each new child already holds, as its `value`, the sum of its whole subtree; add those values to `root.value`, and that is the new value of this node. No value is counted twice, because the subtrees of different children do not overlap.\n\nThe new nodes keep the shape and the child order. A leaf keeps its own value, and the empty tree gives `null`. The sums go into new nodes, not into the old `value` fields, so the input stays as it was.',
            example: 'subtree_sums on 5 first builds its children. The call on 2 finds a leaf: nothing to add, value 2. The same for 8: value 8. Back at the root, the new value is 5 + 2 + 8 = 15. The result is 15 with the children 2 and 8.',
            cost: 'Time O(n). Memory O(n) for the new tree, plus O(h) for the calls. A separate walk of each node’s subtree would cost O(n × h), up to n² on a chain.',
            pitfalls: [
                'Adding the children’s original values instead of their new ones counts one level only: 9 → 5 → 2 → 0 must give 16, 7, 2, 0, not 14, 7, 2, 0.',
                'Forgetting the node’s own value: the root of the example gets 10 instead of 15.',
                'Writing the sums into the input’s `value` fields changes the tree the caller passed in.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Tree (abstract data type): Terminology, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(abstract_data_type)#Terminology'},
        ],
        hints: ['Compute the transformed children first. Their new values are the totals you need for the current node.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function subtree_sums(root)
{
    if (root === null) {
        return null;
    }
    const children = root.children.map(subtree_sums);
    let value = root.value;
    for (const child of children) {
        value += child.value;
    }
    return {value, children};
}`,
        solution_php: `<?php

function subtree_sums($root)
{
    if ($root === null) {
        return null;
    }
    $children = array_map('subtree_sums', $root->children);
    $value = $root->value;
    foreach ($children as $child) {
        $value += $child->value;
    }
    return (object) ['value' => $value, 'children' => $children];
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 6, children: [{value: 4, children: []}, {value: 7, children: []}]}]}, {value: 10, children: []}, {value: 14, children: [{value: 13, children: []}]}]}]},
            {label: 'Negative values', args: [{value: -2, children: [{value: 5, children: [{value: 7, children: []}]}, {value: 5, children: [{value: -8, children: []}]}, {value: 0, children: []}]}]},
            {label: 'Deep branch', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}]},
            {label: 'Empty tree', args: [null]},
            {label: 'A subtree cancels to zero', args: [{value: 2, children: [{value: 5, children: [{value: -5, children: []}]}, {value: 4, children: []}]}]},
            {label: 'Repeated values contribute separately', args: [{value: 2, children: [{value: 2, children: []}, {value: 2, children: [{value: 2, children: []}]}]}]},
            {label: 'A leaf keeps its value', args: [{value: -3, children: []}]},
            {label: 'Thirty nodes, generated', args: [{value: 79, children: [{value: 14, children: [{value: 32, children: [{value: 73, children: [{value: 13, children: []}, {value: 37, children: []}, {value: 82, children: [{value: 26, children: []}]}]}, {value: 79, children: []}]}, {value: -47, children: [{value: 38, children: []}, {value: 69, children: []}, {value: 74, children: [{value: 6, children: []}]}]}]}, {value: -45, children: [{value: 91, children: [{value: 15, children: [{value: -24, children: []}, {value: -38, children: []}, {value: 87, children: []}, {value: -16, children: []}]}, {value: 99, children: [{value: -1, children: [{value: 9, children: []}]}, {value: 70, children: []}]}]}, {value: -25, children: []}]}, {value: 61, children: []}, {value: -8, children: [{value: 86, children: [{value: 42, children: []}]}]}]}]},
            {label: 'A chain of fifty', args: [{value: 0, children: [{value: 1, children: [{value: 2, children: [{value: 3, children: [{value: 4, children: [{value: 5, children: [{value: 6, children: [{value: 7, children: [{value: 8, children: [{value: 9, children: [{value: 10, children: [{value: 11, children: [{value: 12, children: [{value: 13, children: [{value: 14, children: [{value: 15, children: [{value: 16, children: [{value: 17, children: [{value: 18, children: [{value: 19, children: [{value: 20, children: [{value: 21, children: [{value: 22, children: [{value: 23, children: [{value: 24, children: [{value: 25, children: [{value: 26, children: [{value: 27, children: [{value: 28, children: [{value: 29, children: [{value: 30, children: [{value: 31, children: [{value: 32, children: [{value: 33, children: [{value: 34, children: [{value: 35, children: [{value: 36, children: [{value: 37, children: [{value: 38, children: [{value: 39, children: [{value: 40, children: [{value: 41, children: [{value: 42, children: [{value: 43, children: [{value: 44, children: [{value: 45, children: [{value: 46, children: [{value: 47, children: [{value: 48, children: [{value: 49, children: []}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},
        ],
    },
    {
        uid: 'remove-matches-and-promote-children',
        group: 'Transformations',
        level: 3,
        title: 'Remove matches and promote children',
        fn: 'tree_promote_children',
        params: ['root', 'target'],
        signature: 'function tree_promote_children(root, target)',
        brief: 'Remove all nodes with the target value, moving their surviving children into the removed nodes’ positions.',
        rules: ['Return an array of roots because removing the original root can expose several new roots. Preserve sibling order and keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}, target: 5}},
        explanation: {
            approach: 'When a node is removed, its children take its place among its siblings, in order. If the root is removed, its children become several roots, which is why the answer is always an array of roots. So let every call answer the same question: what goes in this node’s place? For a node that stays, one node. For a removed one, its surviving children: any number of nodes, maybe none.\n\nWork bottom-up. First call the function on each child and join the arrays they return, in order, into one array: those are this node’s new children, already free of matches at every depth below. Then, if `root.value` is target, return that array itself, so the children move up into this node’s place. Otherwise return an array of one new node, with `root.value` and those children.\n\nThis is the flatMap pattern: each child maps to a list, and the lists are joined. The empty tree gives `[]`.',
            example: 'Take target 5. The root’s children come first: the call on 2 finds no children, and 2 is not 5, so it returns [{value: 2, children: []}]; the call on 8 returns [{value: 8, children: []}]. Joined, the new children of 5 are 2 and 8. The root matches, so it returns that array itself: [{value: 2, children: []}, {value: 8, children: []}], two roots.',
            cost: 'Time O(n) when matches are few. Each removed node copies its survivors into its parent’s array once more, so a run of k matches stacked above m survivors adds k × m copies, O(n × h) at worst. Memory O(n) for the new tree, plus O(h) for the calls.',
            pitfalls: [
                'Returning a node or `null` instead of an array cannot express a removed root with two children: the answer is a list of roots, `[]` when nothing is left.',
                '`children.push(result)` instead of `children.push(...result)` puts arrays inside `children`.',
                'Removing a match but keeping its children as they were misses a match below a match: with target 0, the tree 0 → [0 → [1], 2] must give [1, 2].',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Array.prototype.flatMap(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap'},
        ],
        hints: ['Have each recursive call return a list of survivors for that position.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_promote_children(root, target)
{
    if (root === null) {
        return [];
    }
    const children = [];
    for (const child of root.children) {
        children.push(...tree_promote_children(child, target));
    }
    if (root.value === target) {
        return children;
    }
    return [{value: root.value, children}];
}`,
        solution_php: `<?php

function tree_promote_children($root, $target)
{
    if ($root === null) {
        return [];
    }
    $children = [];
    foreach ($root->children as $child) {
        array_push($children, ...tree_promote_children($child, $target));
    }
    if ($root->value === $target) {
        return $children;
    }
    return [(object) ['value' => $root->value, 'children' => $children]];
}`,
        cases: [
            {label: 'Promote children in place', args: [{value: 8, children: [{value: 3, children: [{value: 1, children: []}, {value: 2, children: []}]}, {value: 9, children: []}]}, 3]},
            {label: 'Promote roots through multiple matches', args: [{value: 0, children: [{value: 0, children: [{value: 1, children: []}]}, {value: 2, children: []}]}, 0]},
            {label: 'Everything matches', args: [{value: 0, children: [{value: 0, children: []}, {value: 0, children: [{value: 0, children: []}, {value: 0, children: []}]}]}, 0]},
            {label: 'No match', args: [{value: 9, children: [{value: 5, children: [{value: 2, children: [{value: 0, children: []}]}]}]}, 99]},
            {label: 'Empty tree', args: [null, 0]},
            {label: 'Thirty generated nodes', args: [{value: 55, children: [{value: 82, children: [{value: 20, children: [{value: -18, children: []}, {value: 48, children: [{value: 23, children: [{value: 72, children: []}]}, {value: -10, children: []}]}, {value: 66, children: []}]}, {value: 25, children: [{value: -38, children: [{value: -28, children: [{value: 83, children: []}]}, {value: 77, children: []}]}]}, {value: 79, children: [{value: 28, children: [{value: 53, children: []}]}, {value: 48, children: [{value: 85, children: []}]}]}, {value: 60, children: []}]}, {value: 55, children: [{value: -4, children: [{value: 21, children: []}, {value: 37, children: []}, {value: 70, children: [{value: -31, children: []}]}]}]}, {value: 30, children: []}, {value: 48, children: [{value: 30, children: []}]}, {value: 30, children: []}]}, -18]},
        ],
    },
    {
        uid: 'format',
        group: 'Transformations',
        level: 3,
        title: 'Print the tree',
        fn: 'format_tree',
        params: ['root'],
        signature: 'function format_tree(root)',
        brief: 'Return the tree as text, drawn the way the `tree` command draws directories.',
        rules: ['One line per node, joined with `\\n`, no trailing newline. The line of the root is its uid.', 'The line of a child is the prefix inherited from its ancestors, then `├── `, or `└── ` for a last child, then the uid.', 'For the lines below a child, the prefix grows by `│   ` when that child has siblings after it, and by four spaces when it is the last one.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'Each line has two parts: what the node’s ancestors leave on the left, and the node’s own branch. The branch is `├── ` for a child with siblings after it and `└── ` for the last child, then the uid. The left part comes from the ancestors. Below a child that has siblings after it, the vertical line must run on past all its descendants to reach the next sibling, so its descendants get `│   `; below a last child nothing follows, so its descendants get four spaces.\n\nSo pass that left part, `prefix`, down the recursion, and walk in preorder: a node’s line comes before the lines of its children. The root’s line is its bare uid, and its children start with the empty prefix. For each child, add the line `prefix` + branch + uid, then recurse into the child with `prefix` + indent. Both the branch and the indent depend on whether the child is the last one, so loop with an index.\n\nCollect the lines in an array and join them with `\\n` at the end: no trailing newline.',
            example: 'The root’s line is a, and its children get the empty prefix. b has a sibling after it: its line is ├── b, and its children, none here, would get the prefix │ and three spaces. c is the last child: its line is └── c, and its children would get four spaces. Joined with `\\n`, the result prints as:\na\n├── b\n└── c',
            cost: 'Time O(n × h): there are n lines, and each one copies a prefix of up to 4 × h characters. Memory O(n × h) for the text, plus O(h) for the calls.',
            pitfalls: [
                'Growing the prefix by the branch, `├── ` or `└── `, instead of the indent, `│   ` or four spaces, draws branches again on the lines below.',
                'Using `│   ` below a last child draws a line down to a sibling that does not exist.',
                'Adding `\\n` after every line leaves a trailing newline; join the lines instead.',
            ],
        },
        sources: [
            {title: 'tree (command), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(command)'},
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Box-drawing characters, Wikipedia', url: 'https://en.wikipedia.org/wiki/Box-drawing_characters'},
        ],
        hints: ['Pass a `prefix` string down the recursion. Each level appends four characters to it.', 'Inside the loop over children you need to know whether this child is the last one: use an index loop.', 'Pick the branch, `└── ` or `├── `, and the indent, four spaces or `│   `, from `is_last`. The line is prefix, branch, uid; the recursion gets prefix plus indent.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function format_tree(root)
{
    const lines = [root.uid];
    children_format(root, '');
    return lines.join('\\n');
    function children_format(node, prefix) {
        for (let i = 0, end = node.children.length; i < end; ++i) {
            const child = node.children[i];
            const is_last = i === end - 1;
            const branch = is_last ? '└── ' : '├── ';
            const indent = is_last ? '    ' : '│   ';
            lines.push(\`\${prefix}\${branch}\${child.uid}\`);
            children_format(child, \`\${prefix}\${indent}\`);
        }
    }
}`,
        solution_php: `<?php

function format_tree($root)
{
    $lines = [$root->uid];
    format_tree_children($root, '', $lines);
    return implode("\\n", $lines);
}

function format_tree_children($node, $prefix, &$lines)
{
    for ($i = 0, $end = count($node->children); $i < $end; ++$i) {
        $child = $node->children[$i];
        $is_last = ($i === $end - 1);
        $branch = $is_last ? '└── ' : '├── ';
        $indent = $is_last ? '    ' : '│   ';
        $lines[] = $prefix . $branch . $child->uid;
        format_tree_children($child, $prefix . $indent, $lines);
    }
}`,
        cases: [
            {label: 'A project folder', args: [{uid: 'project', children: [{uid: 'src', children: [{uid: 'app.js', size: 420, children: []}, {uid: 'tree', children: [{uid: 'walk.js', size: 180, children: []}, {uid: 'find.js', size: 95, children: []}]}, {uid: 'index.html', size: 60, children: []}]}, {uid: 'docs', children: [{uid: 'readme.md', size: 30, children: []}]}, {uid: 'package.json', size: 12, children: []}, {uid: 'empty', children: []}]}]},
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}]},
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n6', children: [{uid: 'n8', children: [{uid: 'n9', children: [{uid: 'n39', children: []}, {uid: 'n40', children: [{uid: 'n56', children: []}, {uid: 'n73', children: []}]}, {uid: 'n109', children: []}]}, {uid: 'n14', children: [{uid: 'n23', children: [{uid: 'n25', children: []}, {uid: 'n29', children: []}, {uid: 'n47', children: [{uid: 'n57', children: []}]}, {uid: 'n90', children: [{uid: 'n102', children: []}]}]}, {uid: 'n36', children: []}, {uid: 'n98', children: []}]}, {uid: 'n16', children: [{uid: 'n18', children: [{uid: 'n26', children: [{uid: 'n31', children: [{uid: 'n33', children: [{uid: 'n58', children: [{uid: 'n67', children: [{uid: 'n69', children: [{uid: 'n75', children: []}, {uid: 'n77', children: [{uid: 'n87', children: []}]}, {uid: 'n112', children: []}]}]}]}]}]}, {uid: 'n61', children: [{uid: 'n85', children: []}]}]}, {uid: 'n38', children: [{uid: 'n52', children: []}, {uid: 'n86', children: [{uid: 'n104', children: []}]}]}, {uid: 'n66', children: [{uid: 'n74', children: [{uid: 'n89', children: [{uid: 'n110', children: []}]}]}]}, {uid: 'n72', children: []}]}, {uid: 'n114', children: []}]}, {uid: 'n108', children: []}, {uid: 'n113', children: []}]}, {uid: 'n43', children: [{uid: 'n48', children: []}]}]}, {uid: 'n7', children: [{uid: 'n13', children: [{uid: 'n27', children: [{uid: 'n71', children: []}]}, {uid: 'n80', children: []}, {uid: 'n95', children: []}]}, {uid: 'n64', children: []}]}, {uid: 'n12', children: [{uid: 'n49', children: [{uid: 'n51', children: [{uid: 'n103', children: []}]}]}]}, {uid: 'n44', children: [{uid: 'n62', children: []}, {uid: 'n65', children: [{uid: 'n107', children: []}]}]}]}, {uid: 'n3', children: [{uid: 'n17', children: []}, {uid: 'n19', children: [{uid: 'n55', children: [{uid: 'n97', children: []}, {uid: 'n106', children: []}]}, {uid: 'n79', children: []}]}, {uid: 'n45', children: [{uid: 'n88', children: []}]}, {uid: 'n94', children: []}]}, {uid: 'n4', children: [{uid: 'n15', children: [{uid: 'n20', children: []}]}, {uid: 'n41', children: [{uid: 'n53', children: [{uid: 'n118', children: []}]}, {uid: 'n96', children: []}, {uid: 'n115', children: []}]}, {uid: 'n99', children: []}]}, {uid: 'n10', children: [{uid: 'n21', children: [{uid: 'n82', children: []}]}, {uid: 'n105', children: []}]}, {uid: 'n11', children: [{uid: 'n22', children: [{uid: 'n68', children: [{uid: 'n76', children: []}]}]}, {uid: 'n28', children: [{uid: 'n30', children: [{uid: 'n50', children: []}, {uid: 'n54', children: []}, {uid: 'n78', children: []}]}, {uid: 'n32', children: [{uid: 'n37', children: []}, {uid: 'n84', children: []}, {uid: 'n101', children: []}, {uid: 'n119', children: []}]}, {uid: 'n34', children: [{uid: 'n42', children: [{uid: 'n70', children: []}, {uid: 'n116', children: []}]}]}, {uid: 'n46', children: []}]}, {uid: 'n81', children: []}, {uid: 'n111', children: []}]}, {uid: 'n24', children: [{uid: 'n93', children: []}]}, {uid: 'n35', children: [{uid: 'n59', children: []}]}, {uid: 'n63', children: [{uid: 'n83', children: [{uid: 'n100', children: [{uid: 'n117', children: []}]}]}]}]}, {uid: 'n5', children: []}, {uid: 'n60', children: [{uid: 'n91', children: []}, {uid: 'n92', children: []}]}]}]},
        ],
    },
    {
        uid: 'from-text',
        group: 'Transformations',
        level: 3,
        title: 'Parse an indented outline',
        fn: 'tree_from_indented_text',
        params: ['text'],
        signature: 'function tree_from_indented_text(text)',
        brief: 'Parse an indented outline into a tree. Each line holds one uid, and two spaces of indentation mean one level deeper.',
        rules: ['The first line is the root and has no indentation.', 'Skip blank lines.', 'Each node is `{uid, children}`.'],
        input: {text: 'A string, one uid on each line; two spaces of indentation mean one level deeper. The first line is the root.', example: {text: 'a\n  b\n    c\n  d'}},
        explanation: {
            approach: 'Each line carries two things: a uid, the line without its spaces, and a depth, the number of leading spaces divided by two. The parent of a line is the last line before it that is one level shallower. An outline lists the tree in preorder, so every line between the two belongs to a deeper subtree that is already finished.\n\nSo the parser needs only the latest node at each depth, the open path from the root to the current line: an array `stack` where `stack[depth]` is the latest node seen at that depth. For a new node at depth d, its parent is `stack[d - 1]`: push the node into that parent’s `children`, then store it in `stack[d]`. Entries deeper than d are stale now, but they are never read: the next deeper line overwrites them first. That is why climbing back several levels at once needs no popping.\n\nBlank lines hold no node: skip them. The answer is `stack[0]`, the root. Python reads indented code with the same kind of stack.',
            example: 'Line a: depth 0, so it is the root, and `stack` is [a]. Line “  b”: two spaces, depth 1; its parent is stack[0], a, so b goes into a’s children, and `stack` is [a, b]. Line “    c”: depth 2, its parent is stack[1], b, and `stack` is [a, b, c]. Line “  d”: depth 1 again, its parent is stack[0], a, so d goes into a’s children after b, and stack[1] becomes d; the stale c in stack[2] is never read. The result is a with the children b and d, and c under b.',
            cost: 'Time O(L), L the length of the text: each line is split off, trimmed and measured once. Memory O(n) for the tree and O(h) for `stack`. There is no recursion, so a deep outline is no risk to the call stack.',
            pitfalls: [
                'Not skipping blank lines: an empty line has no leading spaces, so it lands at depth 0 and replaces the root. The text may start and end with a newline.',
                'With a classic stack of open nodes, popping only once when the depth drops: going back from depth 3 to depth 1 closes two levels, so pop until the top is the new parent.',
                'Measuring the depth as `line.length - line.trim().length` counts trailing spaces too; count only the leading ones, with `trimStart()`.',
            ],
        },
        sources: [
            {title: 'Off-side rule, Wikipedia', url: 'https://en.wikipedia.org/wiki/Off-side_rule'},
            {title: 'Lexical analysis: Indentation, Python documentation', url: 'https://docs.python.org/3/reference/lexical_analysis.html#indentation'},
        ],
        hints: ['The depth of a line is its number of leading spaces divided by 2.', 'The parent of a line is the most recent line that is one level shallower. Keep an array where `stack[depth]` is the latest node seen at that depth.', 'Push the new node into `stack[depth - 1].children`, then store it in `stack[depth]`.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_from_indented_text(text)
{
    const stack = [];
    for (const line of text.split('\\n')) {
        if (line.trim() === '') {
            continue;
        }
        const depth = (line.length - line.trimStart().length)/2;
        const node = {uid: line.trim(), children: []};
        if (depth > 0) {
            stack[depth - 1].children.push(node);
        }
        stack[depth] = node;
    }
    return stack[0];
}`,
        solution_php: `<?php

function tree_from_indented_text($text)
{
    $stack = [];
    foreach (explode("\\n", $text) as $line) {
        if (trim($line) === '') {
            continue;
        }
        $depth = (strlen($line) - strlen(ltrim($line))) / 2;
        $node = (object) ['uid' => trim($line), 'children' => []];
        if ($depth > 0) {
            $stack[$depth - 1]->children[] = $node;
        }
        $stack[$depth] = $node;
    }
    return $stack[0];
}`,
        cases: [
            {label: 'The bushy tree', args: ['a\n  b\n    d\n    e\n      h\n      i\n  c\n    f\n  g']},
            {label: 'A single line', args: ['a']},
            {label: 'A chain', args: ['a\n  b\n    c\n      d']},
            {label: 'Climbing back several levels at once', args: ['a\n  b\n  c\n    d\n    e\n      f\n      g\n        h\n  z']},
            {label: 'Blank lines in between', args: ['\nproject\n  src\n    app.js\n    tree\n      walk.js\n      find.js\n    index.html\n\n  docs\n    readme.md\n  package.json\n  empty\n']},
            {label: '40 nodes, generated', args: ['n0\n  n1\n    n8\n    n12\n    n38\n  n2\n    n3\n      n7\n        n10\n        n14\n          n27\n            n30\n              n37\n        n26\n      n24\n      n25\n    n4\n      n9\n        n13\n        n18\n      n17\n        n31\n      n23\n    n5\n      n16\n      n19\n        n20\n        n22\n          n33\n            n36\n        n32\n          n34\n      n21\n        n28\n        n35\n    n6\n      n39\n    n11\n    n15\n    n29']},
        ],
    },
    {
        uid: 'insert',
        group: 'Editing in place',
        level: 2,
        title: 'Insert a node',
        fn: 'tree_insert',
        params: ['root', 'parent_uid', 'node', 'index'],
        signature: 'function tree_insert(root, parent_uid, node, index)',
        brief: 'Insert `node` as a child of the node with uid `parent_uid`, at position `index`. Change the tree in place.',
        rules: ['When `index` is `undefined`, or larger than the number of children, append at the end.', 'Return `true` after inserting. Return `false`, changing nothing, when the parent is missing.'],
        input: {text: 'root is a tree of {uid, children} nodes; parent_uid a uid; node a node, maybe with children of its own; index a number, or undefined.', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, parent_uid: 'c', node: {uid: 'x', children: []}, index: 0}},
        explanation: {
            approach: 'The task is two steps: find the node whose uid is `parent_uid`, then put `node` into its `children` array at position `index`. Nothing else in the tree moves, and `node` keeps its own children, so a whole subtree goes in as one piece.\n\nThe search is a preorder walk that returns the first node with the wanted uid, or `null` when the walk ends without it; each call passes up what a child’s search found as soon as it finds it, so the walk stops there. Without a parent, return `false` before anything changes.\n\nThe insertion is `parent.children.splice(index, 0, node)`: at `index`, remove nothing and insert `node`, so the children from `index` on move one place to the right. `splice` treats an index past the end as the end, so that case appends by itself. It reads `undefined` as 0, though, so replace an `undefined` index with `parent.children.length` first. Then return `true`.',
            example: 'The search starts at a, which is not c, and tries its children in order: b is not c and has no children, so its search finds nothing; c is the one. c’s children are [], and splice at index 0 puts x there. The function returns true, and the tree is a with the children b and c, and x under c.',
            cost: 'Time O(n) for the search, which may visit every node, plus O(k) for the splice, k the number of the parent’s children that move one place. Memory O(h) for the calls of the search waiting on the stack.',
            pitfalls: [
                '`splice(undefined, 0, node)` inserts at the front, not at the end: `splice` reads `undefined` as 0, so an `undefined` index must become `children.length` first.',
                '`splice(index, 1, node)` replaces the child at `index` instead of inserting before it: the 1 removes one item.',
                'Searching only among the root’s children misses a parent deeper down, and the root itself can be the parent.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): common operations, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Common_operations'},
            {title: 'Array.prototype.splice(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'},
        ],
        hints: ['Find the parent first: that is the search you already wrote.', '`children.splice(index, 0, node)` inserts without removing anything. An index past the end appends.'],
        observe: 'edit',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function tree_insert(root, parent_uid, node, index)
{
    const parent = node_find(root);
    if (!parent) {
        return false;
    }
    parent.children.splice(index ?? parent.children.length, 0, node);
    return true;
    function node_find(current) {
        if (current.uid === parent_uid) {
            return current;
        }
        for (const child of current.children) {
            const found = node_find(child);
            if (found) {
                return found;
            }
        }
        return null;
    }
}`,
        solution_php: `<?php

function tree_insert($root, $parent_uid, $node, $index = null)
{
    $parent = tree_insert_node_find($root, $parent_uid);
    if ($parent === null) {
        return false;
    }
    array_splice($parent->children, $index ?? count($parent->children), 0, [$node]);
    return true;
}

function tree_insert_node_find($current, $parent_uid)
{
    if ($current->uid === $parent_uid) {
        return $current;
    }
    foreach ($current->children as $child) {
        $found = tree_insert_node_find($child, $parent_uid);
        if ($found !== null) {
            return $found;
        }
    }
    return null;
}`,
        cases: [
            {label: 'As the first child', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'c', {uid: 'x', children: []}, 0]},
            {label: 'Appended to a leaf, no index', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'g', {uid: 'x', children: []}]},
            {label: 'Between two children of the root', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'a', {uid: 'x', children: []}, 1]},
            {label: 'An index past the end', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'b', {uid: 'x', children: []}, 99]},
            {label: 'A whole subtree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'f', {uid: 'x', children: [{uid: 'y', children: []}, {uid: 'z', children: []}]}]},
            {label: 'A parent that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'zz', {uid: 'x', children: []}, 0]},
        ],
    },
    {
        uid: 'remove',
        group: 'Editing in place',
        level: 2,
        title: 'Remove a node',
        fn: 'tree_remove',
        params: ['root', 'uid'],
        signature: 'function tree_remove(root, uid)',
        brief: 'Detach the node with the given uid, together with its subtree, and return it. Change the tree in place.',
        rules: ['Return `null`, changing nothing, when the uid is missing or belongs to the root.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, uid: '\'b\''}},
        explanation: {
            approach: 'Detaching a node means taking it out of its parent’s `children` array; the node keeps its own children, so its whole subtree comes away with it. That takes the parent and the node’s position among its siblings, and a node does not know its parent. So look from the parent’s side: at each node, check its children one by one for the wanted uid.\n\nLoop over `root.children` with an index `i`. If the child at `i` has the uid, take it out with `splice(i, 1)` and return it. Otherwise recurse into that child, which does the same one level down, and if it removed something, return that at once. When no child and no subtree has the uid, return `null`.\n\nThe root is no one’s child, so this search can never remove it: the root’s uid gives `null`, as the rules want, with no special case. Nothing changes until the node is found, so a missing uid leaves the tree as it was.',
            example: 'The example gives the tree; take `uid` "b". At a, the loop looks at the first child, b: it has the uid, so splice(0, 1) takes it out of a’s children, and b is returned with its own children, here none. a is left with the one child c. With "c", the loop first recurses into b, which finds nothing, then removes c at index 1. With "a", the root, or "zz", no child anywhere matches, the tree stays as it is, and the result is null.',
            cost: 'Time O(n): the search may visit every node, and the splice moves the siblings after the node one place left. Memory O(h) for the calls waiting on the stack.',
            pitfalls: [
                'Recursing into a child but ignoring what it returns: the node is removed down there, yet the loop goes on and the function returns `null`.',
                'Searching for the node itself, as Find a node by uid does, reaches it with no way back to its parent: check the children from the parent’s side.',
                'Returning `true`, or the parent, instead of the detached node: the rules want the node, with its subtree still under it.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): common operations, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Common_operations'},
            {title: 'Array.prototype.splice(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'},
        ],
        hints: ['You need the parent of the node and its position among the siblings, so look at the children from the side of the parent.', 'Loop over `root.children` with an index. On a match, `splice(i, 1)` and return the child; otherwise recurse into it.'],
        observe: 'edit',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function tree_remove(root, uid)
{
    for (let i = 0, end = root.children.length; i < end; ++i) {
        const child = root.children[i];
        if (child.uid === uid) {
            root.children.splice(i, 1);
            return child;
        }
        const removed = tree_remove(child, uid);
        if (removed) {
            return removed;
        }
    }
    return null;
}`,
        solution_php: `<?php

function tree_remove($root, $uid)
{
    foreach ($root->children as $i => $child) {
        if ($child->uid === $uid) {
            array_splice($root->children, $i, 1);
            return $child;
        }
        $removed = tree_remove($child, $uid);
        if ($removed !== null) {
            return $removed;
        }
    }
    return null;
}`,
        cases: [
            {label: 'A leaf', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'h']},
            {label: 'A whole subtree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'b']},
            {label: 'The middle one of five', args: [{uid: 'm', children: [{uid: 'n', children: []}, {uid: 'o', children: []}, {uid: 'p', children: []}, {uid: 'q', children: []}, {uid: 'r', children: []}]}, 'p']},
            {label: 'A uid that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'zz']},
            {label: 'The root cannot be removed', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'a']},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, 'n9']},
        ],
    },
    {
        uid: 'move-into',
        group: 'Editing in place',
        level: 3,
        title: 'Move a node',
        fn: 'tree_move_into',
        params: ['root', 'uid', 'target_uid', 'index'],
        signature: 'function tree_move_into(root, uid, target_uid, index)',
        brief: 'Move the node with uid `uid`, together with its subtree, so it becomes a child of the node with uid `target_uid` at position `index`. Change the tree in place.',
        rules: ['When `index` is `undefined`, append at the end. The index is counted after the node has been detached, which matters when it moves within the same parent.', 'Return `true` after moving.', 'Return `false`, changing nothing, when either uid is missing, when `uid` is the root, or when the target is the node itself or lies inside its subtree.'],
        input: {text: 'root is a tree of {uid, children} nodes; uid and target_uid are uids; index a number, or undefined.', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}, uid: 'c', target_uid: 'b', index: 0}},
        explanation: {
            approach: 'A move is a remove followed by an insert: take the node with uid `uid`, with its subtree, out of its parent’s `children`, and splice it into the `children` of the node with uid `target_uid` at `index`. What makes it harder is that it is all or nothing: a refused move leaves no trace, so every check comes before the first change.\n\nThe checks: the node must exist and must not be the root, so look for its parent, which the root does not have; the target must exist; and the target must be neither the node itself nor inside its subtree. Hanging a node under its own descendant would hang it under a part of itself and cut the whole piece off from the tree. The test is a search for `target_uid` that starts at the node being moved: if it finds the target, refuse.\n\nOnly then detach the node with `splice` at its position in the parent, and insert it with `splice(index, 0, node)`, an `undefined` index meaning the end. The index counts after the detach: moving a node to index 2 of its own parent means index 2 among the siblings left once it is out.',
            example: 'Moving c into b at index 0: c’s parent is a, the target b exists, and a search from c does not reach b, so the move goes ahead. c is spliced out of a’s children, leaving [b], and into b’s children at index 0. The function returns true: a has the one child b, and c hangs under b. Moving a instead returns false, since the root has no parent, and moving c into c returns false too: the search from c finds the target at once.',
            cost: 'Time O(n): three searches over the tree, for the parent, the target and the target inside the subtree, plus two splices. Memory O(h) for the calls waiting on the stack.',
            pitfalls: [
                'Detaching the node before every check is done: a refused move, say into its own subtree, has already changed the tree, and the rules want no trace.',
                'Leaving out the check for the node’s own subtree cuts that subtree off: moving b under one of its children hangs b under a node that hangs under b, and both drop out of the tree.',
                'Inserting before detaching, or counting `index` on the siblings as they were, puts a node moved forward within its own parent one place off: the index counts after the detach.',
            ],
        },
        sources: [
            {title: 'Tree (data structure): common operations, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Common_operations'},
            {title: 'Array.prototype.splice(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'},
        ],
        hints: ['Validate everything before touching the tree, so that a refused move leaves no trace.', 'A move into the own subtree of the node would cut that subtree loose. Search for `target_uid` starting from the node being moved; if you find it, refuse.', 'After that it is remove plus insert: splice the node out of the children of its parent and into those of the target.'],
        observe: 'edit',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function tree_move_into(root, uid, target_uid, index)
{
    const parent = parent_find(root, uid);
    const target = node_find(root, target_uid);
    if (!parent || !target) {
        return false;
    }
    const node = parent.children.find(v => v.uid === uid);
    if (node_find(node, target_uid)) {
        return false;
    }
    parent.children.splice(parent.children.indexOf(node), 1);
    target.children.splice(index ?? target.children.length, 0, node);
    return true;
    function node_find(current, wanted_uid) {
        if (current.uid === wanted_uid) {
            return current;
        }
        for (const child of current.children) {
            const found = node_find(child, wanted_uid);
            if (found) {
                return found;
            }
        }
        return null;
    }
    function parent_find(current, wanted_uid) {
        for (const child of current.children) {
            if (child.uid === wanted_uid) {
                return current;
            }
            const found = parent_find(child, wanted_uid);
            if (found) {
                return found;
            }
        }
        return null;
    }
}`,
        solution_php: `<?php

function tree_move_into($root, $uid, $target_uid, $index = null)
{
    $parent = tree_move_into_parent_find($root, $uid);
    $target = tree_move_into_node_find($root, $target_uid);
    if (($parent === null) || ($target === null)) {
        return false;
    }
    $i = array_search($uid, array_column($parent->children, 'uid'), true);
    $node = $parent->children[$i];
    if (tree_move_into_node_find($node, $target_uid) !== null) {
        return false;
    }
    array_splice($parent->children, $i, 1);
    array_splice($target->children, $index ?? count($target->children), 0, [$node]);
    return true;
}

function tree_move_into_node_find($current, $wanted_uid)
{
    if ($current->uid === $wanted_uid) {
        return $current;
    }
    foreach ($current->children as $child) {
        $found = tree_move_into_node_find($child, $wanted_uid);
        if ($found !== null) {
            return $found;
        }
    }
    return null;
}

function tree_move_into_parent_find($current, $wanted_uid)
{
    foreach ($current->children as $child) {
        if ($child->uid === $wanted_uid) {
            return $current;
        }
        $found = tree_move_into_parent_find($child, $wanted_uid);
        if ($found !== null) {
            return $found;
        }
    }
    return null;
}`,
        cases: [
            {label: 'A leaf into another branch', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'g', 'c']},
            {label: 'A subtree to the front of the root', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'e', 'a', 0]},
            {label: 'Reorder within the same parent', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'd', 'b', 1]},
            {label: 'Into its own subtree: refused', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'b', 'h']},
            {label: 'Into itself: refused', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'b', 'b']},
            {label: 'The root cannot move', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'a', 'g']},
            {label: 'A node that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'zz', 'a']},
            {label: 'A target that is not there', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, 'd', 'zz']},
            {label: 'Up to an ancestor', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}, 'h', 'a', 1]},
        ],
    },
    {
        uid: 'build-a-forest-from-rows',
        group: 'Tree and flat data',
        level: 2,
        title: 'Build a forest from rows',
        fn: 'build_forest',
        params: ['rows'],
        signature: 'function build_forest(rows)',
        brief: 'Convert flat rows of {id, parent_id} into a forest: an array of root nodes shaped as {id, children}.',
        rules: ['IDs are unique strings. A null parent_id marks a root. All parents exist and there are no cycles. Children can appear before parents. Keep the original row order among roots and siblings.'],
        input: {text: 'Each row has a unique string id and a parent_id. Use null for root rows. A row may appear before its parent.', example: {rows: [{id: 'child', parent_id: 'parent'}, {id: 'parent', parent_id: null}]}},
        explanation: {
            approach: 'Each row names its parent, but in the forest each node has to hold its children: the links point the other way. So the task comes down to turning every `parent_id` into a push into that parent’s `children`. A row may come before its parent’s row, so when a child is read its parent’s node may not exist yet, and a single pass is not enough.\n\nThe standard fix is two passes over `rows` with a lookup from id to node, a hash map. The first pass makes one `{id, children: []}` node per row and stores it under its id. The second pass goes over the rows again, in their order: a row whose `parent_id` is `null` pushes its node onto the output array of roots, and any other row pushes its node into the `children` of the node stored under its `parent_id`. By then every node exists, so every lookup finds one.\n\nThe order needs no extra work. The second pass reads the rows in input order and only appends, so the roots come out in the order of their rows and the children of each node in the order of theirs. The nodes are new objects, and the rows are only read.',
            example: 'The rows are child → parent, then parent → null. Pass one makes two nodes and stores them under "child" and "parent". Pass two reads the row of child first: its `parent_id` is "parent", so the child node goes into the parent node’s `children`. Then the row of parent: its `parent_id` is `null`, so the parent node goes onto the roots. The result is [{id: "parent", children: [{id: "child", children: []}]}]. A single pass would have failed on the first row, where the node "parent" did not exist yet.',
            cost: 'Time O(n) for n rows: two passes, and each Map lookup is O(1) on average. Memory O(n) for the lookup and the new nodes. Searching all the rows for the children of each node instead would cost O(n²), n × n checks.',
            pitfalls: [
                'Linking in the same pass that creates the nodes breaks as soon as a child row comes before its parent: the lookup for its `parent_id` finds nothing yet.',
                'A plain object `{}` as the lookup has keys nobody stored: `lookup["constructor"]` is already the function `Object`, so `lookup[id] ??= ...` skips making the node and `.children.push` throws, and assigning to `lookup["__proto__"]` sets the object’s prototype; a `Map` has neither problem.',
                'Testing for a root with `!row.parent_id` treats the id `""` as no parent: compare with `null`.',
            ],
        },
        sources: [
            {title: 'Tree (data structure), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Representations'},
            {title: 'Union/Find and the Parent Pointer Implementation, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/UnionFind.html'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps'},
        ],
        hints: ['Create and index a node for each ID in one pass. Attach each node to its parent or the roots array in a second pass.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function build_forest(rows)
{
    const node_by_id = new Map();
    const out = [];
    for (const row of rows) {
        node_by_id.set(row.id, {id: row.id, children: []});
    }
    for (const row of rows) {
        const current = node_by_id.get(row.id);
        if (row.parent_id === null) {
            out.push(current);
        }
        else {
            node_by_id.get(row.parent_id).children.push(current);
        }
    }
    return out;
}`,
        solution_php: `<?php

function build_forest($rows)
{
    $node_by_id = [];
    $out = [];
    foreach ($rows as $row) {
        $node_by_id[$row->id] = (object) ['id' => $row->id, 'children' => []];
    }
    foreach ($rows as $row) {
        $current = $node_by_id[$row->id];
        if ($row->parent_id === null) {
            $out[] = $current;
        }
        else {
            $node_by_id[$row->parent_id]->children[] = $current;
        }
    }
    return $out;
}`,
        cases: [
            {label: 'Project files', args: [[{id: 'src', parent_id: 'app'}, {id: 'app', parent_id: null}, {id: 'docs', parent_id: null}, {id: 'index.js', parent_id: 'src'}, {id: 'test', parent_id: 'app'}, {id: 'README', parent_id: 'docs'}]]},
            {label: 'Two roots', args: [[{id: 'b', parent_id: null}, {id: 'a', parent_id: null}]]},
            {label: 'Empty rows', args: [[]]},
            {label: 'Reversed chain', args: [[{id: 'c', parent_id: 'b'}, {id: 'b', parent_id: 'a'}, {id: 'a', parent_id: null}]]},
            {label: 'Sibling order', args: [[{id: 'z', parent_id: 'r'}, {id: 'r', parent_id: null}, {id: 'a', parent_id: 'r'}]]},
            {label: 'Interleaved roots and descendants', args: [[{id: 'leaf', parent_id: 'branch'}, {id: 'other', parent_id: null}, {id: 'last', parent_id: 'root'}, {id: 'branch', parent_id: 'root'}, {id: 'root', parent_id: null}]]},
            {label: 'Empty string is a valid parent ID', args: [[{id: 'leaf', parent_id: ''}, {id: '', parent_id: null}]]},
            {label: 'IDs that match object properties', args: [[{id: '__proto__', parent_id: 'constructor'}, {id: 'constructor', parent_id: null}]]},
        ],
    },
    {
        uid: 'flatten-a-forest',
        group: 'Tree and flat data',
        level: 2,
        title: 'Flatten a forest',
        fn: 'flatten_forest',
        params: ['roots'],
        signature: 'function flatten_forest(roots)',
        brief: 'Convert a forest of {id, children} nodes into a flat array of {id, parent_id} rows in preorder.',
        rules: ['Process roots and siblings in array order. A root’s parent_id is null. An empty forest gives an empty array.'],
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}]}},
        explanation: {
            approach: 'This is the reverse of building a forest from rows: each node becomes one row, and the link from a parent to its children becomes a `parent_id` on each child’s row. The order asked for is preorder: a node’s row first, then the rows of its whole first subtree, then of the second, and so on, and the next root only when the previous root’s tree is done.\n\nA node does not know its parent, so the walk carries it down. A helper `visit(node, parent_id)` pushes `{id: node.id, parent_id}` and then calls itself on each child with `node.id` as the parent. The outer loop calls it on each root with `null`. Pushing before the loop over the children is what makes the order preorder; pushing after it would give postorder, children before parents.\n\nAll rows go into one shared output array in the order they are reached, so no sorting is needed afterwards.',
            example: 'The forest has one root, parent, with one child, child. visit(parent, null) pushes {id: "parent", parent_id: null} and calls visit(child, "parent"), which pushes {id: "child", parent_id: "parent"}; child has no children, so the walk returns, and there are no more roots. The result is [{id: "parent", parent_id: null}, {id: "child", parent_id: "parent"}].',
            cost: 'Time O(n): each node is visited once and gives one row. Memory O(n) for the rows plus O(h) for the calls on the stack, h the height; a very deep chain can overflow the stack, and a loop over an explicit stack of nodes avoids it.',
            pitfalls: [
                'Listing all the roots first and their children after them, level by level, is not preorder: “Finish each branch before the next root” wants each root’s whole tree before the next root.',
                'Writing `parent_id: parent_id || null` turns the id `""` into `null`: the child of a root with id `""` must keep `parent_id: ""`.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Sequential Tree Representations, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/SequentialRep.html'},
        ],
        hints: ['Pass the parent ID to each recursive call. Emit the row before visiting its children.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function flatten_forest(roots)
{
    const out = [];
    function visit(current, parent_id) {
        out.push({id: current.id, parent_id});
        for (const child of current.children) {
            visit(child, current.id);
        }
    }
    for (const root of roots) {
        visit(root, null);
    }
    return out;
}`,
        solution_php: `<?php

function flatten_forest($roots)
{
    $out = [];
    foreach ($roots as $root) {
        flatten_forest_visit($root, null, $out);
    }
    return $out;
}

function flatten_forest_visit($current, $parent_id, &$out)
{
    $out[] = ['id' => $current->id, 'parent_id' => $parent_id];
    foreach ($current->children as $child) {
        flatten_forest_visit($child, $current->id, $out);
    }
}`,
        cases: [
            {label: 'Project files', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}]]},
            {label: 'Empty forest', args: [[]]},
            {label: 'Single root', args: [[{id: 'root', children: []}]]},
            {label: 'Multiple roots', args: [[{id: 'a', children: []}, {id: 'b', children: [{id: 'c', children: []}]}]]},
            {label: 'Finish each branch before the next root', args: [[{id: 'other', children: []}, {id: 'root', children: [{id: 'last', children: []}, {id: 'branch', children: [{id: 'leaf', children: []}]}]}]]},
            {label: 'Empty string parent stays a string', args: [[{id: '', children: [{id: 'child', children: []}]}]]},
            {label: 'Root order follows the array', args: [[{id: '10', children: []}, {id: '2', children: []}, {id: '1', children: []}]]},
        ],
    },
    {
        uid: 'find-a-forest-nodes-ancestors',
        group: 'Tree and flat data',
        level: 2,
        title: 'Find a forest node’s ancestors',
        fn: 'forest_find_ancestor_ids',
        params: ['roots', 'target_id'],
        signature: 'function forest_find_ancestor_ids(roots, target_id)',
        brief: 'Return the ancestor IDs for the node with target_id, from the root to its parent.',
        rules: ['Exclude the matched node itself. Return [] for a root match and null for an ID that does not exist.'],
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}], target_id: '\'child\''}},
        explanation: {
            approach: 'The ancestors of a node are the nodes on the one path from its root down to it, without the node itself. A depth-first walk always stands at the end of such a path, so the walk can carry it: pass down `path`, the ids from the root to the current node’s parent.\n\nAt each node, compare first: if `node.id === target_id`, the answer is `path` as it is, which is `[]` for a root. Otherwise extend it with this node’s id and search each child with the longer path. A search returns the path when it finds the target and `null` when it does not, and the first answer that is not `null` goes straight back up, so the other branches are not searched. The outer loop does the same over the roots; if every root gives `null`, the id is not in the forest.\n\nMaking a new array `[...path, node.id]` for the children, instead of pushing to one shared array, means a branch without the target cannot leave its ids behind. With one shared array, pop the id after the children are searched: that is backtracking.',
            example: 'The Task tab gives the forest but no `target_id`; take "child". The root parent is not the target, so its children are searched with the path ["parent"]. child is the target and returns ["parent"], and that goes up unchanged: the answer is ["parent"]. With "parent" the root matches at once and the answer is the empty path, []. With "missing" both nodes are searched, both return `null`, and so does the function.',
            cost: 'Time O(n) node visits in the worst case, when the target is the last node or absent. Copying the path costs O(depth) at each node, O(n × h) in all; one shared array with push and pop brings that back to O(n). Memory O(h) for the calls and the path.',
            pitfalls: [
                'Adding the node’s id to the path before comparing it puts the target itself into the answer: a root would give its own id instead of [].',
                'Keeping the last child’s answer instead of returning the first one that is not `null` loses a match: index.js is found under src, then the search of test returns `null` over it.',
                'Returning [] when nothing is found makes “not in the forest” look like “a root”: the rules want `null` for the first.',
            ],
        },
        sources: [
            {title: 'Depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Depth-first_search'},
            {title: 'Tree (data structure), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#ancestor'},
            {title: 'Information Flow in Recursive Functions, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeInfFlw.html'},
        ],
        hints: ['Pass the current path down as you visit each node.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function forest_find_ancestor_ids(roots, target_id)
{
    for (const root of roots) {
        const ancestors = find_path(root, []);
        if (ancestors !== null) {
            return ancestors;
        }
    }
    return null;
    function find_path(current, path) {
        if (current.id === target_id) {
            return path;
        }
        const next = [...path, current.id];
        for (const child of current.children) {
            const ancestors = find_path(child, next);
            if (ancestors !== null) {
                return ancestors;
            }
        }
        return null;
    }
}`,
        solution_php: `<?php

function forest_find_ancestor_ids($roots, $target_id)
{
    foreach ($roots as $root) {
        $ancestors = forest_find_ancestor_ids_path($root, [], $target_id);
        if ($ancestors !== null) {
            return $ancestors;
        }
    }
    return null;
}

function forest_find_ancestor_ids_path($current, $path, $target_id)
{
    if ($current->id === $target_id) {
        return $path;
    }
    $next = [...$path, $current->id];
    foreach ($current->children as $child) {
        $ancestors = forest_find_ancestor_ids_path($child, $next, $target_id);
        if ($ancestors !== null) {
            return $ancestors;
        }
    }
    return null;
}`,
        cases: [
            {label: 'Nested file', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'index.js']},
            {label: 'Second root', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'docs']},
            {label: 'Unknown ID', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'missing']},
            {label: 'Empty ID is a string', args: [[{id: '', children: [{id: 'a', children: []}]}], 'a']},
            {label: 'Empty forest', args: [[], 'app']},
        ],
    },
    {
        uid: 'rows-from-tree',
        group: 'Tree and flat data',
        level: 2,
        title: 'Flatten into rows',
        fn: 'rows_from_tree',
        params: ['root'],
        signature: 'function rows_from_tree(root)',
        brief: 'Flatten the tree into rows, the shape a table holds. Return one `{uid, parent_uid, depth}` object per node, in pre-order.',
        rules: ['The root has `parent_uid: null` and `depth: 0`.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'Each node becomes one row, and two of the three fields of a row are not stored in the node: the uid of its parent and its depth. Both are facts about the path from the root, so a walk that starts at the root can hand them down. The root has no parent and depth 0, and a child of a node at depth d has that node as its parent and depth d + 1.\n\nSo the walk is preorder with two extra arguments. `walk(node, parent_uid, depth)` pushes `{uid: node.uid, parent_uid, depth}` first and then calls `walk(child, node.uid, depth + 1)` for each child in order; it starts as `walk(root, null, 0)`. Pushing before the children is what puts each parent above its subtree in the rows.\n\nThis is information flowing down the tree: a node needs a value that only its ancestors know, so it gets it as a parameter rather than looking it up later.',
            example: 'The root a has two children, b and c, both leaves. walk(a, null, 0) pushes {uid: "a", parent_uid: null, depth: 0}, then walk(b, "a", 1) pushes {uid: "b", parent_uid: "a", depth: 1}, and walk(c, "a", 1) pushes {uid: "c", parent_uid: "a", depth: 1}. The result is those three rows in that order.',
            cost: 'Time O(n): one visit and one row per node. Memory O(n) for the rows plus O(h) for the calls on the stack, which on a chain is n deep.',
            pitfalls: [
                'Keeping the depth in one variable that goes up on the way down but not back on the way up gives later siblings the wrong depth; passing `depth + 1` as an argument cannot get out of step.',
                'Breadth-first order is not preorder: in “The bushy tree” the rows of b’s subtree, d, e, h and i, must come before c.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Information Flow in Recursive Functions, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeInfFlw.html'},
        ],
        hints: ['Pass the uid of the parent and the depth down the walk as arguments.', 'The recursive call is `(child, node.uid, depth + 1)`.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function rows_from_tree(root)
{
    const out = [];
    subtree_walk(root, null, 0);
    return out;
    function subtree_walk(node, parent_uid, depth) {
        out.push({uid: node.uid, parent_uid, depth});
        for (const child of node.children) {
            subtree_walk(child, node.uid, depth + 1);
        }
    }
}`,
        solution_php: `<?php

function rows_from_tree($root)
{
    $out = [];
    rows_from_tree_walk($root, null, 0, $out);
    return $out;
}

function rows_from_tree_walk($node, $parent_uid, $depth, &$out)
{
    $out[] = ['uid' => $node->uid, 'parent_uid' => $parent_uid, 'depth' => $depth];
    foreach ($node->children as $child) {
        rows_from_tree_walk($child, $node->uid, $depth + 1, $out);
    }
}`,
        cases: [
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n3', children: [{uid: 'n4', children: [{uid: 'n5', children: [{uid: 'n9', children: [{uid: 'n14', children: [{uid: 'n29', children: [{uid: 'n42', children: []}, {uid: 'n58', children: [{uid: 'n61', children: []}, {uid: 'n77', children: [{uid: 'n102', children: []}]}, {uid: 'n112', children: []}]}]}, {uid: 'n33', children: [{uid: 'n81', children: []}, {uid: 'n114', children: []}]}, {uid: 'n97', children: [{uid: 'n110', children: []}, {uid: 'n113', children: []}]}]}]}, {uid: 'n20', children: []}, {uid: 'n25', children: [{uid: 'n57', children: []}]}]}, {uid: 'n15', children: [{uid: 'n26', children: [{uid: 'n103', children: []}]}, {uid: 'n31', children: [{uid: 'n35', children: [{uid: 'n36', children: [{uid: 'n39', children: []}, {uid: 'n115', children: []}]}]}]}, {uid: 'n49', children: [{uid: 'n50', children: []}, {uid: 'n78', children: []}]}, {uid: 'n68', children: [{uid: 'n72', children: []}]}]}, {uid: 'n16', children: [{uid: 'n18', children: [{uid: 'n107', children: []}]}, {uid: 'n40', children: [{uid: 'n75', children: [{uid: 'n94', children: []}]}, {uid: 'n85', children: []}]}, {uid: 'n54', children: [{uid: 'n59', children: []}]}]}, {uid: 'n41', children: []}, {uid: 'n52', children: [{uid: 'n70', children: []}, {uid: 'n109', children: []}]}, {uid: 'n53', children: []}, {uid: 'n92', children: [{uid: 'n95', children: []}]}]}, {uid: 'n6', children: [{uid: 'n13', children: [{uid: 'n22', children: [{uid: 'n27', children: [{uid: 'n86', children: []}]}, {uid: 'n30', children: []}, {uid: 'n98', children: []}]}, {uid: 'n84', children: [{uid: 'n105', children: []}]}, {uid: 'n91', children: []}]}, {uid: 'n83', children: [{uid: 'n101', children: []}]}]}, {uid: 'n56', children: []}, {uid: 'n71', children: []}, {uid: 'n119', children: []}]}, {uid: 'n8', children: [{uid: 'n11', children: [{uid: 'n19', children: [{uid: 'n24', children: [{uid: 'n32', children: [{uid: 'n93', children: [{uid: 'n117', children: []}]}]}, {uid: 'n76', children: [{uid: 'n96', children: []}]}]}, {uid: 'n28', children: [{uid: 'n34', children: [{uid: 'n89', children: []}]}, {uid: 'n63', children: [{uid: 'n87', children: []}]}, {uid: 'n64', children: [{uid: 'n69', children: []}, {uid: 'n104', children: []}]}]}, {uid: 'n44', children: [{uid: 'n48', children: [{uid: 'n67', children: []}]}, {uid: 'n100', children: []}]}, {uid: 'n65', children: [{uid: 'n108', children: []}]}, {uid: 'n99', children: []}]}, {uid: 'n55', children: [{uid: 'n111', children: []}]}, {uid: 'n80', children: []}]}, {uid: 'n12', children: [{uid: 'n90', children: []}]}, {uid: 'n73', children: [{uid: 'n116', children: []}]}]}, {uid: 'n10', children: [{uid: 'n37', children: []}]}]}, {uid: 'n2', children: [{uid: 'n47', children: []}, {uid: 'n60', children: []}, {uid: 'n118', children: []}]}, {uid: 'n7', children: [{uid: 'n17', children: [{uid: 'n45', children: [{uid: 'n46', children: []}, {uid: 'n106', children: []}]}, {uid: 'n79', children: []}, {uid: 'n88', children: []}]}, {uid: 'n21', children: [{uid: 'n23', children: [{uid: 'n43', children: [{uid: 'n66', children: []}]}]}, {uid: 'n38', children: [{uid: 'n82', children: []}]}]}, {uid: 'n51', children: []}, {uid: 'n62', children: []}]}, {uid: 'n74', children: []}]}]},
        ],
    },
    {
        uid: 'tree-from-rows',
        group: 'Tree and flat data',
        level: 2,
        title: 'Build a tree from rows',
        fn: 'tree_from_rows',
        params: ['rows'],
        signature: 'function tree_from_rows(rows)',
        brief: 'Build the nested tree from flat `{uid, parent_uid}` rows. Return the root node.',
        rules: ['Exactly one row has `parent_uid: null`: the root.', 'Rows come in any order; a child can appear before its parent.', 'Children keep the order their rows have in the input.', 'Each node is `{uid, children}`. Do not modify the rows.'],
        input: {text: 'Each row is {uid, parent_uid}; parent_uid is null on exactly one row, the root. Rows come in any order.', example: {rows: [{uid: 'b', parent_uid: 'a'}, {uid: 'a', parent_uid: null}]}},
        explanation: {
            approach: 'The rows are the tree written as a table: each row knows its parent, and the nested tree needs each node to know its children. Turning the links around takes one lookup from uid to node. Because a child’s row can come before its parent’s, make all the nodes first and link them after.\n\nFirst pass: for each row make a new `{uid, children: []}` and store it in `node_by_uid` under its uid. Second pass, over the rows again in input order: the row with `parent_uid === null` is the root, so remember its node; any other row pushes its node into `node_by_uid[row.parent_uid].children`. Return the root.\n\nThe children come out in the order of their rows because the second pass reads the rows in order and only appends. The nodes are new objects, so the rows stay as they were.',
            example: 'The rows are b → a, then a → null. Pass one makes the nodes b and a. Pass two reads b’s row: its parent is a, so node b goes into a’s `children`. Then a’s row: `parent_uid` is `null`, so a is the root. The result is {uid: "a", children: [{uid: "b", children: []}]}, though b’s row came first.',
            cost: 'Time O(n): two passes with an O(1) lookup each. Memory O(n) for the lookup and the nodes. Scanning all the rows for the children of every node would be O(n²): 1,600 checks for the 40 shuffled rows instead of two passes of 40.',
            pitfalls: [
                'Adding `children` to the row objects and using them as nodes changes the rows, which the rules forbid; make new `{uid, children}` objects.',
                'Linking in the first pass fails on “Children listed before their parents”: the parent’s node does not exist yet when its child’s row is read.',
                'Sorting rows or children by uid changes the order: children keep the order of their rows.',
            ],
        },
        sources: [
            {title: 'Tree (data structure), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#Representations'},
            {title: 'Hash table, Wikipedia', url: 'https://en.wikipedia.org/wiki/Hash_table'},
        ],
        hints: ['Do it in two passes. First create every node and remember it in a `node_by_uid` lookup.', 'Second pass: push each node into `node_by_uid[row.parent_uid].children`. The row with `parent_uid === null` is the root.', 'That runs in O(n). Scanning the whole list for the children of each node would be O(n²).'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Gym'],
        solution: `function tree_from_rows(rows)
{
    let root = null;

    const node_by_uid = {};
    for (const row of rows) {
        node_by_uid[row.uid] = {uid: row.uid, children: []};
    }
    for (const row of rows) {
        const node = node_by_uid[row.uid];
        if (row.parent_uid === null) {
            root = node;
            continue;
        }
        node_by_uid[row.parent_uid].children.push(node);
    }
    return root;
}`,
        solution_php: `<?php

function tree_from_rows($rows)
{
    $root = null;
    $node_by_uid = [];
    foreach ($rows as $row) {
        $node_by_uid[$row->uid] = (object) ['uid' => $row->uid, 'children' => []];
    }
    foreach ($rows as $row) {
        $node = $node_by_uid[$row->uid];
        if ($row->parent_uid === null) {
            $root = $node;
            continue;
        }
        $node_by_uid[$row->parent_uid]->children[] = $node;
    }
    return $root;
}`,
        cases: [
            {label: 'Rows in pre-order', args: [[{uid: 'a', parent_uid: null}, {uid: 'b', parent_uid: 'a'}, {uid: 'd', parent_uid: 'b'}, {uid: 'e', parent_uid: 'b'}, {uid: 'h', parent_uid: 'e'}, {uid: 'i', parent_uid: 'e'}, {uid: 'c', parent_uid: 'a'}, {uid: 'f', parent_uid: 'c'}, {uid: 'g', parent_uid: 'a'}]]},
            {label: 'Children listed before their parents', args: [[{uid: 'g', parent_uid: 'a'}, {uid: 'f', parent_uid: 'c'}, {uid: 'c', parent_uid: 'a'}, {uid: 'i', parent_uid: 'e'}, {uid: 'h', parent_uid: 'e'}, {uid: 'e', parent_uid: 'b'}, {uid: 'd', parent_uid: 'b'}, {uid: 'b', parent_uid: 'a'}, {uid: 'a', parent_uid: null}]]},
            {label: 'A single row', args: [[{uid: 'a', parent_uid: null}]]},
            {label: 'Shuffled rows', args: [[{uid: 'h', parent_uid: 'g'}, {uid: 'e', parent_uid: 'c'}, {uid: 'b', parent_uid: 'a'}, {uid: 'd', parent_uid: 'c'}, {uid: 'g', parent_uid: 'e'}, {uid: 'c', parent_uid: 'a'}, {uid: 'a', parent_uid: null}, {uid: 'f', parent_uid: 'e'}]]},
            {label: '40 shuffled rows', args: [[{uid: 'n11', parent_uid: 'n2'}, {uid: 'n6', parent_uid: 'n2'}, {uid: 'n15', parent_uid: 'n2'}, {uid: 'n36', parent_uid: 'n33'}, {uid: 'n39', parent_uid: 'n6'}, {uid: 'n1', parent_uid: 'n0'}, {uid: 'n19', parent_uid: 'n5'}, {uid: 'n2', parent_uid: 'n0'}, {uid: 'n0', parent_uid: null}, {uid: 'n20', parent_uid: 'n19'}, {uid: 'n25', parent_uid: 'n3'}, {uid: 'n12', parent_uid: 'n1'}, {uid: 'n4', parent_uid: 'n2'}, {uid: 'n34', parent_uid: 'n32'}, {uid: 'n37', parent_uid: 'n30'}, {uid: 'n23', parent_uid: 'n4'}, {uid: 'n14', parent_uid: 'n7'}, {uid: 'n27', parent_uid: 'n14'}, {uid: 'n28', parent_uid: 'n21'}, {uid: 'n22', parent_uid: 'n19'}, {uid: 'n7', parent_uid: 'n3'}, {uid: 'n10', parent_uid: 'n7'}, {uid: 'n3', parent_uid: 'n2'}, {uid: 'n33', parent_uid: 'n22'}, {uid: 'n38', parent_uid: 'n1'}, {uid: 'n21', parent_uid: 'n5'}, {uid: 'n35', parent_uid: 'n21'}, {uid: 'n30', parent_uid: 'n27'}, {uid: 'n16', parent_uid: 'n5'}, {uid: 'n24', parent_uid: 'n3'}, {uid: 'n26', parent_uid: 'n7'}, {uid: 'n18', parent_uid: 'n9'}, {uid: 'n9', parent_uid: 'n4'}, {uid: 'n8', parent_uid: 'n1'}, {uid: 'n13', parent_uid: 'n9'}, {uid: 'n32', parent_uid: 'n19'}, {uid: 'n31', parent_uid: 'n17'}, {uid: 'n5', parent_uid: 'n2'}, {uid: 'n29', parent_uid: 'n2'}, {uid: 'n17', parent_uid: 'n4'}]]},
        ],
    },
    {
        uid: 'measure-every-forest-subtree',
        group: 'Tree and flat data',
        level: 3,
        title: 'Measure every forest subtree',
        fn: 'forest_list_subtree_sizes',
        params: ['roots'],
        signature: 'function forest_list_subtree_sizes(roots)',
        brief: 'Return one {id, size} row per node in forest preorder.',
        rules: ['Size includes the node and its descendants. Visit roots and siblings in input order. Return an empty array for an empty forest.'],
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}]}},
        explanation: {
            approach: 'Two orders pull against each other here. The rows must come in preorder, a parent before its children, but a node’s size is known only after its whole subtree has been counted, which is postorder. The size itself is the familiar recursion: 1 for the node plus the sizes of its children’s subtrees.\n\nThe way out is to reserve the row on the way in and fill it in on the way out. `visit(node)` makes `row = {id: node.id, size: 1}` and pushes it at once, so it takes its preorder place. Then it calls `visit` on each child, which returns that child’s subtree size, and adds it to `row.size`. When the loop is over, the row holds the full size, and `visit` returns it to its own parent. The array holds the row object itself, not a copy, so filling it in later changes the row in the output too.\n\nThe outer loop calls `visit` on each root in order. A forest is just trees side by side: the size of one root never includes another.',
            example: 'The forest has one root, parent, with one child, child. visit(parent) pushes {id: "parent", size: 1}; visit(child) pushes {id: "child", size: 1} and, with no children, returns 1; the parent’s row becomes 1 + 1 = 2. The result is [{id: "parent", size: 2}, {id: "child", size: 1}]: parent first, though its size was finished last.',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the rows and O(h) for the calls. Counting each node’s subtree with its own walk gives the same rows but walks every node again for each of its ancestors, O(n × h), which is O(n²) on a chain.',
            pitfalls: [
                'Pushing the row after the children are counted gives the right sizes in the wrong order, children before parents.',
                'Forgetting the 1 for the node itself makes every leaf size 0.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Tree (data structure), Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_(data_structure)#size_of_a_tree'},
            {title: 'Information Flow in Recursive Functions, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeInfFlw.html'},
        ],
        hints: ['Reserve a row as you enter a node. Fill its size after visiting its children.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function forest_list_subtree_sizes(roots)
{
    const out = [];
    for (const root of roots) {
        visit(root);
    }
    return out;
    function visit(current) {
        const row = {id: current.id, size: 1};
        out.push(row);
        for (const child of current.children) {
            row.size += visit(child);
        }
        return row.size;
    }
}`,
        solution_php: `<?php

function forest_list_subtree_sizes($roots)
{
    $out = [];
    foreach ($roots as $root) {
        forest_list_subtree_sizes_visit($root, $out);
    }
    return $out;
}

function forest_list_subtree_sizes_visit($current, &$out)
{
    $row = (object) ['id' => $current->id, 'size' => 1];
    $out[] = $row;
    foreach ($current->children as $child) {
        $row->size += forest_list_subtree_sizes_visit($child, $out);
    }
    return $row->size;
}`,
        cases: [
            {label: 'Project files', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}]]},
            {label: 'Several roots and an uneven branch', args: [[{id: 'other', children: []}, {id: 'root', children: [{id: 'last', children: []}, {id: 'branch', children: [{id: 'leaf', children: []}]}]}]]},
            {label: 'Root order follows the array', args: [[{id: 'z', children: []}, {id: 'a', children: []}]]},
            {label: 'Empty string ID', args: [[{id: '', children: [{id: 'leaf', children: []}]}]]},
            {label: 'A single root', args: [[{id: 'one', children: []}]]},
            {label: 'Empty forest', args: [[]]},
        ],
    },
    {
        uid: 'move-a-forest-node',
        group: 'Tree and flat data',
        level: 3,
        title: 'Move a forest node',
        fn: 'forest_move_node',
        params: ['roots', 'node_id', 'parent_id'],
        signature: 'function forest_move_node(roots, node_id, parent_id)',
        brief: 'Move the node and its whole subtree under parent_id. Use null to move it to root level.',
        rules: ['Append it at its destination. Preserve every other node’s order. An existing parent leaves the order intact. Return null for missing IDs or a move under the node or one of its descendants. Keep the input unchanged.'],
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}], node_id: '\'child\'', parent_id: null}},
        explanation: {
            approach: 'A move is a removal from one array, the roots or a parent’s `children`, and an append to another. Three things need care: an id that is not in the forest, a destination inside the moving subtree, and a node that already sits under that parent. And the input must stay as it was, so the whole move happens on a copy, `structuredClone(roots)`.\n\nIndex the copy first with one walk: for each id store `{node, siblings, parent_id}`, where `siblings` is the array the node sits in. Then a missing `node_id`, or a `parent_id` that is not `null` and is missing, is found at once, and the answer is `null`.\n\nThe cycle check climbs up, not down: start at `parent_id` and follow the stored parent links to the top. If the climb meets `node_id`, the destination is the node itself or one of its descendants; moving it there would hang the subtree under itself and cut it off from the forest, so return `null`. The climb takes at most h steps.\n\nIf the node’s current parent is already `parent_id`, the copy is returned as it is, and the node keeps its place among its siblings. Otherwise splice the node out of `siblings` and push it onto the destination: the copy’s roots for `null`, or the new parent’s `children`. Its subtree goes with it, since it hangs off the node.',
            example: 'The Task tab gives the forest, parent with one child, child, but no ids; take `node_id` "child" and `parent_id` `null`. Both ids are known, and the climb from `null` has nothing to meet. child’s parent is "parent", not `null`, so child is spliced out of parent’s `children` and pushed onto the roots: [{id: "parent", children: []}, {id: "child", children: []}]. Moving "parent" under "child" climbs from child to parent, meets the node being moved, and returns `null`. Moving "child" under "parent" returns a copy that looks just like the input.',
            cost: 'Time O(n) for the copy and the index; the climb is O(h) and the splice O(k) for k siblings. Memory O(n) for the copy and the index.',
            pitfalls: [
                'Splicing the caller’s arrays changes the input, which the rules forbid: clone first, and index the clone, so the records point into the copy.',
                'Checking only that `parent_id` is not `node_id` misses deeper cycles: moving app under its grandchild index.js must give `null`.',
                'Removing and appending when the parent does not change moves the node to the end of its siblings: “Same parent preserves order” wants it left in place.',
            ],
        },
        sources: [
            {title: 'Parent pointer tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Parent_pointer_tree'},
            {title: 'structuredClone(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone'},
            {title: 'Array.prototype.splice(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'},
        ],
        hints: ['Store each node’s container and parent ID in a lookup.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function forest_move_node(roots, node_id, parent_id)
{
    const out = structuredClone(roots);
    const record_by_id = new Map();
    index_nodes(out, null);
    if (!record_by_id.has(node_id) || ((parent_id !== null) && !record_by_id.has(parent_id))) {
        return null;
    }
    let cursor = parent_id;
    while (cursor !== null) {
        if (cursor === node_id) {
            return null;
        }
        cursor = record_by_id.get(cursor).parent_id;
    }
    const record = record_by_id.get(node_id);
    if (record.parent_id !== parent_id) {
        const destination = (parent_id === null) ? out : record_by_id.get(parent_id).node.children;
        record.siblings.splice(record.siblings.indexOf(record.node), 1);
        destination.push(record.node);
    }
    return out;
    function index_nodes(siblings, parent_id) {
        for (const node of siblings) {
            record_by_id.set(node.id, {node, siblings, parent_id});
            index_nodes(node.children, node.id);
        }
    }
}`,
        solution_php: `<?php

function forest_move_node($roots, $node_id, $parent_id)
{
    // a deep copy: new objects all the way down
    $out = json_decode(json_encode($roots));
    $record_by_id = [];
    forest_move_node_index($out, null, $record_by_id);
    if (!isset($record_by_id[$node_id]) || (($parent_id !== null) && !isset($record_by_id[$parent_id]))) {
        return null;
    }
    $cursor = $parent_id;
    while ($cursor !== null) {
        if ($cursor === $node_id) {
            return null;
        }
        $cursor = $record_by_id[$cursor]['parent_id'];
    }
    $record = $record_by_id[$node_id];
    if ($record['parent_id'] !== $parent_id) {
        $node = $record['node'];
        if ($record['parent_id'] === null) {
            array_splice($out, array_search($node, $out, true), 1);
        }
        else {
            $old_parent = $record_by_id[$record['parent_id']]['node'];
            array_splice($old_parent->children, array_search($node, $old_parent->children, true), 1);
        }
        if ($parent_id === null) {
            $out[] = $node;
        }
        else {
            $record_by_id[$parent_id]['node']->children[] = $node;
        }
    }
    return $out;
}

function forest_move_node_index($siblings, $parent_id, &$record_by_id)
{
    foreach ($siblings as $node) {
        $record_by_id[$node->id] = ['node' => $node, 'parent_id' => $parent_id];
        forest_move_node_index($node->children, $node->id, $record_by_id);
    }
}`,
        cases: [
            {label: 'Move to another root', args: [[{id: 'a', children: [{id: 'c', children: []}]}, {id: 'b', children: []}], 'c', 'b']},
            {label: 'Promote to root level', args: [[{id: 'a', children: [{id: 'c', children: []}]}], 'c', null]},
            {label: 'Same parent preserves order', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'src', 'app']},
            {label: 'Cycle through descendant', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'app', 'index.js']},
            {label: 'Missing parent', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'src', 'missing']},
            {label: 'Missing node', args: [[{id: 'app', children: [{id: 'src', children: [{id: 'index.js', children: []}]}, {id: 'test', children: []}]}, {id: 'docs', children: [{id: 'README', children: []}]}], 'missing', 'app']},
        ],
    },
    {
        uid: 'refresh-parents',
        group: 'Parent links',
        level: 1,
        title: 'Link nodes to their parents',
        fn: 'tree_refresh_parents',
        params: ['root'],
        signature: 'function tree_refresh_parents(root)',
        brief: 'Give every node a `parent` field that points to its parent node. The root gets `parent: null`. Change the tree in place; nothing is returned.',
        rules: ['`parent` is derived from `children`. Overwrite whatever it held before, so the function is safe to call again after any edit.'],
        input: {text: 'A tree of {uid, children} nodes; some may still carry a parent field from before an edit.', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'A node’s `children` say who is below it; a `parent` link says who is above it. With the links, code that holds a node can climb without searching from the root. The links are derived data: `children` is the truth, and after any edit the links are rebuilt from it.\n\nThe place to set a link is the loop of a parent over its children, the one moment both objects are at hand: set `child.parent = node`, then go down into the child and do the same for its children. That is a preorder walk. The root has no parent, so it gets `parent: null` before the walk starts.\n\nWrite every link, even where one is there already: an old link may still point at the parent a node had before it was moved. The function changes the tree in place and returns nothing.',
            example: 'The call sets a.parent to `null`, then walks a’s children. b.parent = a, and the walk goes into b, which has no children. c.parent = a, and the same for c. Now b and c point at the very object a, and a points at `null`.',
            cost: 'Time O(n), one assignment per node. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Skipping the root leaves it with no `parent` field at all, which is not the same as `parent: null`.',
                'Setting links only where `parent` is missing keeps stale links after a node has moved; overwrite them all.',
                'Printing the linked tree with `JSON.stringify` throws: a child and its parent point at each other, a cycle. Log the uids instead.',
            ],
        },
        sources: [
            {title: 'Parent pointer tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Parent_pointer_tree'},
            {title: 'Parent Pointer Trees, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/UnionFind.html#parent-pointer-trees'},
            {title: 'TypeError: cyclic object value, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value'},
        ],
        hints: ['Set `root.parent = null`, then walk down.', 'Assign `child.parent = node` in the loop of the parent over its children, where both objects are at hand, then recurse.'],
        observe: 'parents',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function tree_refresh_parents(root)
{
    root.parent = null;
    children_link(root);
    function children_link(node) {
        for (const child of node.children) {
            child.parent = node;
            children_link(child);
        }
    }
}`,
        solution_php: null,
        php_note: 'it links JavaScript objects to their parents',
        cases: [
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: 'Stale links from before an edit', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}], parent: {uid: 'c', children: []}}]}, {uid: 'c', children: [{uid: 'f', children: [], parent: null}]}, {uid: 'g', children: [], parent: {uid: 'a', children: []}}], parent: {uid: 'x', children: []}}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n9', children: [{uid: 'n11', children: [{uid: 'n27', children: []}, {uid: 'n31', children: [{uid: 'n40', children: [{uid: 'n64', children: []}]}, {uid: 'n45', children: []}, {uid: 'n47', children: [{uid: 'n49', children: [{uid: 'n104', children: [{uid: 'n107', children: []}]}]}, {uid: 'n70', children: []}]}]}]}, {uid: 'n37', children: [{uid: 'n41', children: []}, {uid: 'n114', children: []}]}]}, {uid: 'n15', children: [{uid: 'n29', children: [{uid: 'n80', children: []}]}]}, {uid: 'n24', children: [{uid: 'n35', children: [{uid: 'n61', children: []}, {uid: 'n92', children: []}]}, {uid: 'n57', children: []}]}]}, {uid: 'n4', children: [{uid: 'n7', children: [{uid: 'n14', children: [{uid: 'n16', children: [{uid: 'n22', children: [{uid: 'n43', children: [{uid: 'n91', children: []}]}, {uid: 'n87', children: [{uid: 'n119', children: []}]}]}, {uid: 'n38', children: [{uid: 'n50', children: []}, {uid: 'n60', children: [{uid: 'n72', children: [{uid: 'n108', children: [{uid: 'n109', children: []}]}]}, {uid: 'n77', children: []}, {uid: 'n88', children: []}]}, {uid: 'n82', children: []}]}, {uid: 'n51', children: []}, {uid: 'n75', children: []}, {uid: 'n79', children: [{uid: 'n116', children: []}]}]}, {uid: 'n17', children: [{uid: 'n39', children: []}, {uid: 'n63', children: []}]}, {uid: 'n19', children: [{uid: 'n44', children: [{uid: 'n102', children: []}, {uid: 'n115', children: []}]}, {uid: 'n86', children: []}]}, {uid: 'n26', children: [{uid: 'n111', children: []}]}, {uid: 'n46', children: [{uid: 'n83', children: []}]}]}, {uid: 'n20', children: [{uid: 'n55', children: [{uid: 'n62', children: []}, {uid: 'n99', children: []}]}, {uid: 'n69', children: [{uid: 'n94', children: []}]}, {uid: 'n76', children: []}]}]}, {uid: 'n67', children: []}, {uid: 'n93', children: []}, {uid: 'n98', children: []}]}, {uid: 'n74', children: []}, {uid: 'n81', children: []}]}, {uid: 'n6', children: [{uid: 'n12', children: [{uid: 'n23', children: [{uid: 'n28', children: [{uid: 'n42', children: []}]}, {uid: 'n36', children: [{uid: 'n59', children: [{uid: 'n85', children: [{uid: 'n100', children: [{uid: 'n103', children: [{uid: 'n105', children: []}]}]}]}]}, {uid: 'n96', children: []}]}, {uid: 'n52', children: [{uid: 'n84', children: [{uid: 'n117', children: []}]}]}, {uid: 'n58', children: []}]}, {uid: 'n48', children: [{uid: 'n106', children: []}]}, {uid: 'n53', children: [{uid: 'n68', children: []}]}]}]}, {uid: 'n118', children: []}]}, {uid: 'n5', children: [{uid: 'n8', children: [{uid: 'n10', children: [{uid: 'n97', children: []}]}, {uid: 'n25', children: [{uid: 'n32', children: [{uid: 'n78', children: []}]}]}, {uid: 'n30', children: [{uid: 'n54', children: []}, {uid: 'n66', children: [{uid: 'n89', children: []}]}, {uid: 'n110', children: []}]}, {uid: 'n34', children: [{uid: 'n65', children: [{uid: 'n101', children: []}]}, {uid: 'n73', children: []}]}, {uid: 'n56', children: []}, {uid: 'n90', children: [{uid: 'n113', children: []}]}, {uid: 'n95', children: []}]}, {uid: 'n71', children: [{uid: 'n112', children: []}]}]}, {uid: 'n13', children: [{uid: 'n21', children: [{uid: 'n33', children: []}]}]}, {uid: 'n18', children: []}]}]},
        ],
    },
    {
        uid: 'find-next',
        group: 'Parent links',
        level: 3,
        title: 'Step to the next node',
        fn: 'node_find_next',
        params: ['node'],
        signature: 'function node_find_next(node)',
        brief: 'Return the node that follows `node` in pre-order, or `null` after the last one. This is the Down arrow of a tree view.',
        rules: ['There is no root argument. Every node has `children` and a `parent` link, which is `null` on the root.'],
        input: {text: 'node is a node of a tree; every node has children and a parent link, which is null on the root.', example: {node: '{uid: \'b\', children: [], parent: <the node a>}'}},
        explanation: {
            approach: 'Preorder lists a node, then its whole subtree, then what follows that subtree. So from `node` there are two cases. If it has children, the next node is the first of them, `node.children[0]`. If it has none, its subtree is finished, and the next node is its next sibling, the one after it in `node.parent.children`.\n\nWhen there is no next sibling, the parent’s subtree is finished too, and the next node is the parent’s next sibling. With none again, climb on to the grandparent, and so on: the first node on the way up that has a next sibling gives the answer. Climbing past the root, whose `parent` is `null`, means `node` was the last one in preorder: return `null`.\n\nThe browser does the same: the DOM’s TreeWalker nextNode() walks document order, which is preorder, with this very climb. It moves the Down arrow of a tree view without a walk from the root.',
            example: 'Take the tree a with the children b and c. node_find_next(b): b has no children, so look for its next sibling. In b.parent.children, which is [b, c], b is at index 0, and index 1 holds c: the answer is c. From c, the same check finds nothing after it, the climb goes up to a, which has no parent, and the answer is `null`.',
            cost: 'One call: O(1) for a node with children; otherwise up to h levels of climb, each with an `indexOf` over the siblings at that level. Memory O(1): a loop, no recursion. A full walk from the root visits each node once.',
            pitfalls: [
                'Climbing only one level: in the bushy tree of the tests, after i, the last child of e, which is the last child of b, the next node is c, two levels up.',
                'Returning `siblings[index + 1]` as it is gives `undefined` past the end, not `null`, and the walk never sees its end.',
                'Trying the next sibling before the children: a node with children is followed by its first child, b by d, not by c.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'TreeWalker: nextNode() method, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker/nextNode'},
            {title: 'DOM Standard: TreeWalker nextNode(), WHATWG', url: 'https://dom.spec.whatwg.org/#dom-treewalker-nextnode'},
        ],
        hints: ['If the node has children, the next node is its first child.', 'Otherwise it is the next sibling. Find the position of the node in `node.parent.children`.', 'No next sibling: climb to the parent and try its next sibling, and keep climbing. Running out of parents means the walk is over.'],
        observe: 'result',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function node_find_next(node)
{
    if (node.children.length > 0) {
        return node.children[0];
    }
    let current = node;
    while (current.parent) {
        const siblings = current.parent.children;
        const next = siblings[siblings.indexOf(current) + 1];
        if (next) {
            return next;
        }
        current = current.parent;
    }
    return null;
}`,
        solution_php: null,
        php_note: 'its nodes link to their parents',
        cases: [
            {label: 'A node with children', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'b', note: 'Calls the function once, on node `b`.'},
            {label: 'A leaf with a sibling after it', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'd', note: 'Calls the function once, on node `d`.'},
            {label: 'A last child, two levels down', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'i', note: 'Calls the function once, on node `i`.'},
            {label: 'The very last node', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'g', note: 'Calls the function once, on node `g`.'},
            {label: 'The whole bushy tree, from the root', kind: 'steps', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'a', note: 'Starts at the root and keeps calling the function on its own result until it returns `null`. The uids passed must be the pre-order.'},
            {label: 'A single node', kind: 'steps', tree: {uid: 'a', children: []}, start: 'a', note: 'Starts at the root and keeps calling the function until it returns `null`.'},
            {label: 'A lopsided tree, from the root', kind: 'steps', tree: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}, start: 'a', note: 'Starts at the root and keeps calling the function until it returns `null`.'},
            {label: '40 nodes, generated', kind: 'steps', tree: {uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, start: 'n0', note: 'Starts at the root and keeps calling the function until it returns `null`.'},
        ],
    },
    {
        uid: 'find-previous',
        group: 'Parent links',
        level: 3,
        title: 'Step to the previous node',
        fn: 'node_find_previous',
        params: ['node'],
        signature: 'function node_find_previous(node)',
        brief: 'Return the node that comes before `node` in pre-order, or `null` for the root. This is the Up arrow of a tree view.',
        rules: ['There is no root argument. Every node has `children` and a `parent` link, which is `null` on the root.'],
        input: {text: 'node is a node of a tree; every node has children and a parent link, which is null on the root.', example: {node: '{uid: \'c\', children: [], parent: <the node a>}'}},
        explanation: {
            approach: 'Read preorder backwards. Right before a first child comes its parent: the parent is listed, and at once its first child. Right before any other child comes the last node in the subtree of its previous sibling, because that whole subtree is listed between the sibling and the node.\n\nThe last node of a subtree in preorder is found by going down: from the sibling, take its last child, then that child’s last child, until a node has no children. That leaf is the answer; when the previous sibling is a leaf itself, it is the answer at once. The root has no parent and nothing before it: return `null`.\n\nThis is the Up arrow of a tree view, and the DOM’s TreeWalker previousNode() is defined the same way.',
            example: 'Take the tree a with the children b and c. node_find_previous(c): c has a parent, and in a.children, [b, c], c is at index 1, not the first. Its previous sibling is b, and b has no children, so b is the last node of its own subtree: the answer is b. From b, at index 0, the answer is its parent a, and from a, which has no parent, `null`.',
            cost: 'One call: an `indexOf` over the siblings, then down at most h levels to the last node of the previous sibling’s subtree. Memory O(1): loops only, no recursion.',
            pitfalls: [
                'Returning the previous sibling itself: in the bushy tree of the tests, before c comes i, the last node under b, not b.',
                'Going down by first children instead of last ones lands on the wrong node of the sibling’s subtree: d instead of i.',
                'Returning `null` for a first child: before d comes its parent b.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Pre-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'TreeWalker: previousNode() method, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker/previousNode'},
            {title: 'DOM Standard: TreeWalker previousNode(), WHATWG', url: 'https://dom.spec.whatwg.org/#dom-treewalker-previousnode'},
        ],
        hints: ['A first child is preceded by its parent.', 'Any other node is preceded by the last node of the subtree of its previous sibling.', 'The last node of a subtree: keep taking the last child until you reach a leaf.'],
        observe: 'result',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function node_find_previous(node)
{
    if (!node.parent) {
        return null;
    }
    const siblings = node.parent.children;
    const index = siblings.indexOf(node);
    if (index === 0) {
        return node.parent;
    }
    let last = siblings[index - 1];
    while (last.children.length > 0) {
        last = last.children[last.children.length - 1];
    }
    return last;
}`,
        solution_php: null,
        php_note: 'its nodes link to their parents',
        cases: [
            {label: 'A first child', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'd', note: 'Calls the function once, on node `d`.'},
            {label: 'After a leaf sibling', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'e', note: 'Calls the function once, on node `e`.'},
            {label: 'After a whole subtree', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'c', note: 'Calls the function once, on node `c`.'},
            {label: 'The root', kind: 'probe', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'a', note: 'Calls the function once, on node `a`.'},
            {label: 'The whole bushy tree, backwards', kind: 'steps', tree: {uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}, start: 'g', note: 'Starts at the last node and keeps calling the function on its own result until it returns `null`. The uids passed must be the pre-order reversed.'},
            {label: 'A single node', kind: 'steps', tree: {uid: 'a', children: []}, start: 'a', note: 'Starts at the root and keeps calling the function until it returns `null`.'},
            {label: 'A lopsided tree, backwards', kind: 'steps', tree: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}, start: 'h', note: 'Starts at the last node and keeps calling the function until it returns `null`.'},
            {label: '40 nodes, generated', kind: 'steps', tree: {uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}, start: 'n39', note: 'Starts at node `n39` and keeps calling the function until it returns `null`.'},
        ],
    },
    {
        uid: 'refresh-geometry',
        group: 'Parent links',
        level: 3,
        title: 'Lay the tree out',
        fn: 'tree_refresh_geometry',
        params: ['root'],
        signature: 'function tree_refresh_geometry(root)',
        brief: 'Compute a drawing position for every node: set `x` and `y` on each one, in place. Nothing is returned. The diagram draws the tree with your numbers.',
        rules: ['`y` is the depth; the root has `y: 0`.', 'Leaves take `x` = 0, 1, 2, … from left to right.', 'A node with children sits halfway between its first and its last child: `x = (first.x + last.x)/2`.'],
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {
            approach: 'The two coordinates flow in opposite directions. `y` is the depth, known on the way down: the root has 0, and each child one more than its parent, so it goes down as an argument. `x` is known only from below: the leaves are numbered 0, 1, 2… from left to right, and a parent sits halfway between its first and its last child, so its `x` can be set only after its children have theirs, in postorder.\n\nOne walk does both. A counter outside the recursive helper holds the next free `x`: a leaf takes it, and the counter moves on by one. A depth-first walk meets the leaves from left to right, so the numbers come out in order. A node with children places all of them first, then sets its `x` to the middle of the first and the last one.\n\nThis is the simplest tidy layout of a tree: leaves never overlap, since each has a column of its own, and every parent is centered over its children. A node with one child sits right above it.',
            example: 'The walk starts at a with depth 0: a.y = 0, and a has children, so it places them first. b gets y = 1 and, being a leaf, takes x = 0 from the counter, which moves to 1. c gets y = 1 and x = 1. Back in a, the first child is at 0 and the last at 1, so a.x = (0 + 1)/2 = 0.5. The result: a at (0.5, 0), b at (0, 1), c at (1, 1).',
            cost: 'Time O(n), each node placed once. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Passing the leaf counter as an argument: each call gets its own copy, siblings start from the same number, and leaves overlap.',
                'Setting a parent’s `x` before its children are placed reads `undefined` and gives NaN.',
                'Averaging all the children instead of the first and the last: in the bushy tree of the tests, a sits at (0.75 + 4)/2 = 2.375, between b and g, not at the mean of b, c and g.',
            ],
        },
        sources: [
            {title: 'Tree traversal: Post-order, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Drawing Presentable Trees, Bill Mill', url: 'https://llimllib.github.io/pymag-trees/'},
        ],
        hints: ['Leaves are numbered in the order a walk meets them: keep a counter outside the recursive helper.', 'The `x` of a parent depends on those of its children, so set it after the loop over the children: post-order.', '`y` flows down as an argument; `x` flows up from the leaves.'],
        observe: 'geometry',
        check: null,
        is_pure: false,
        from: ['Tree Gym'],
        solution: `function tree_refresh_geometry(root)
{
    let leaves = 0;
    subtree_place(root, 0);
    function subtree_place(node, depth) {
        node.y = depth;
        if (node.children.length === 0) {
            node.x = leaves;
            leaves += 1;
            return;
        }
        for (const child of node.children) {
            subtree_place(child, depth + 1);
        }
        const first = node.children[0];
        const last = node.children[node.children.length - 1];
        node.x = (first.x + last.x)/2;
    }
}`,
        solution_php: null,
        php_note: 'it sets x and y on JavaScript objects in place',
        cases: [
            {label: 'The bushy tree', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
            {label: 'A single node', args: [{uid: 'a', children: []}]},
            {label: 'A chain', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'c', children: [{uid: 'd', children: []}]}]}]}]},
            {label: 'One parent, five leaves', args: [{uid: 'm', children: [{uid: 'n', children: []}, {uid: 'o', children: []}, {uid: 'p', children: []}, {uid: 'q', children: []}, {uid: 'r', children: []}]}]},
            {label: 'A lopsided tree', args: [{uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'f', children: []}, {uid: 'g', children: [{uid: 'h', children: []}]}]}]}]}]},
            {label: '40 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n8', children: []}, {uid: 'n12', children: []}, {uid: 'n38', children: []}]}, {uid: 'n2', children: [{uid: 'n3', children: [{uid: 'n7', children: [{uid: 'n10', children: []}, {uid: 'n14', children: [{uid: 'n27', children: [{uid: 'n30', children: [{uid: 'n37', children: []}]}]}]}, {uid: 'n26', children: []}]}, {uid: 'n24', children: []}, {uid: 'n25', children: []}]}, {uid: 'n4', children: [{uid: 'n9', children: [{uid: 'n13', children: []}, {uid: 'n18', children: []}]}, {uid: 'n17', children: [{uid: 'n31', children: []}]}, {uid: 'n23', children: []}]}, {uid: 'n5', children: [{uid: 'n16', children: []}, {uid: 'n19', children: [{uid: 'n20', children: []}, {uid: 'n22', children: [{uid: 'n33', children: [{uid: 'n36', children: []}]}]}, {uid: 'n32', children: [{uid: 'n34', children: []}]}]}, {uid: 'n21', children: [{uid: 'n28', children: []}, {uid: 'n35', children: []}]}]}, {uid: 'n6', children: [{uid: 'n39', children: []}]}, {uid: 'n11', children: []}, {uid: 'n15', children: []}, {uid: 'n29', children: []}]}]}]},
            {label: '120 nodes, generated', args: [{uid: 'n0', children: [{uid: 'n1', children: [{uid: 'n2', children: [{uid: 'n6', children: []}, {uid: 'n28', children: []}]}, {uid: 'n3', children: [{uid: 'n41', children: [{uid: 'n93', children: []}]}, {uid: 'n92', children: [{uid: 'n100', children: []}]}, {uid: 'n117', children: []}]}, {uid: 'n4', children: [{uid: 'n5', children: [{uid: 'n13', children: [{uid: 'n27', children: []}, {uid: 'n33', children: [{uid: 'n56', children: []}]}, {uid: 'n55', children: [{uid: 'n72', children: [{uid: 'n96', children: []}]}, {uid: 'n84', children: []}]}, {uid: 'n62', children: []}]}, {uid: 'n16', children: [{uid: 'n21', children: []}, {uid: 'n32', children: []}, {uid: 'n59', children: []}, {uid: 'n88', children: []}]}, {uid: 'n25', children: []}, {uid: 'n46', children: []}, {uid: 'n61', children: [{uid: 'n116', children: []}]}, {uid: 'n70', children: [{uid: 'n77', children: []}, {uid: 'n83', children: [{uid: 'n113', children: []}]}]}, {uid: 'n78', children: []}, {uid: 'n91', children: []}]}, {uid: 'n7', children: [{uid: 'n11', children: [{uid: 'n15', children: [{uid: 'n18', children: [{uid: 'n51', children: [{uid: 'n104', children: []}]}, {uid: 'n82', children: []}]}, {uid: 'n24', children: [{uid: 'n31', children: [{uid: 'n69', children: []}]}, {uid: 'n39', children: [{uid: 'n67', children: []}]}]}, {uid: 'n57', children: [{uid: 'n86', children: []}]}, {uid: 'n73', children: [{uid: 'n97', children: [{uid: 'n105', children: []}]}]}, {uid: 'n76', children: [{uid: 'n87', children: []}]}, {uid: 'n94', children: []}, {uid: 'n109', children: []}]}, {uid: 'n23', children: [{uid: 'n35', children: [{uid: 'n45', children: [{uid: 'n79', children: []}]}, {uid: 'n110', children: []}]}, {uid: 'n119', children: []}]}]}, {uid: 'n17', children: [{uid: 'n29', children: [{uid: 'n36', children: [{uid: 'n58', children: []}]}, {uid: 'n48', children: [{uid: 'n60', children: [{uid: 'n68', children: [{uid: 'n75', children: []}]}, {uid: 'n85', children: [{uid: 'n99', children: [{uid: 'n103', children: [{uid: 'n118', children: []}]}]}, {uid: 'n102', children: []}]}]}]}]}, {uid: 'n34', children: []}, {uid: 'n44', children: []}, {uid: 'n53', children: [{uid: 'n71', children: []}]}, {uid: 'n65', children: []}, {uid: 'n101', children: []}]}, {uid: 'n66', children: []}]}, {uid: 'n19', children: [{uid: 'n43', children: [{uid: 'n74', children: []}]}, {uid: 'n81', children: []}]}, {uid: 'n20', children: [{uid: 'n40', children: [{uid: 'n108', children: []}]}, {uid: 'n63', children: []}]}, {uid: 'n37', children: [{uid: 'n47', children: [{uid: 'n106', children: []}, {uid: 'n107', children: []}]}, {uid: 'n54', children: []}, {uid: 'n64', children: []}]}]}, {uid: 'n8', children: [{uid: 'n38', children: []}, {uid: 'n114', children: []}]}, {uid: 'n9', children: [{uid: 'n10', children: []}]}, {uid: 'n98', children: []}, {uid: 'n111', children: []}]}, {uid: 'n12', children: [{uid: 'n22', children: [{uid: 'n26', children: [{uid: 'n50', children: [{uid: 'n52', children: []}, {uid: 'n115', children: []}]}, {uid: 'n80', children: []}, {uid: 'n112', children: []}]}, {uid: 'n30', children: [{uid: 'n49', children: []}, {uid: 'n95', children: []}]}, {uid: 'n42', children: []}]}]}, {uid: 'n14', children: [{uid: 'n89', children: []}, {uid: 'n90', children: []}]}]}]},
        ],
    },
    {
        uid: 'invert-a-binary-tree',
        group: 'Binary trees',
        level: 1,
        title: 'Invert a binary tree',
        fn: 'invert_tree',
        params: ['root'],
        signature: 'function invert_tree(root)',
        brief: 'Return a new binary tree by swapping the left and right branches at every node.',
        rules: ['Each node has value, left, and right properties. A missing branch is null. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Inverting mirrors the tree left to right: at every node, not only at the root, what was on the right ends up on the left. The recursive definition of a binary tree gives the solution in one line: the inverted tree has the same root value, its left subtree is the inverted old right subtree, and its right subtree is the inverted old left subtree. The empty tree inverts to itself, `null`.\n\nWhy that is complete: the swap at the root puts whole subtrees on the other side, and the recursive calls mirror the inside of each one. Every node is handled by exactly one call, so every pair of branches is swapped exactly once.\n\nBecause the input must stay unchanged, the function builds new nodes `{value, left: invert_tree(root.right), right: invert_tree(root.left)}` instead of swapping `left` and `right` in place. Inverting twice gives back a tree equal to the original.',
            example: 'The root 5 has no left child and a right child 8. invert_tree(5) builds a new node 5 whose left is invert_tree(8) and whose right is invert_tree(null), which is `null`. invert_tree(8) builds a node 8 with two `null` branches. The result is {value: 5, left: {value: 8, left: null, right: null}, right: null}: the 8 has moved from the right to the left.',
            cost: 'Time O(n): one call per node. Memory O(n) for the new tree and O(h) for the calls on the stack, 20 deep on “Leaning left, twenty deep” and n on a chain.',
            pitfalls: [
                'Swapping `root.left` and `root.right` in place changes the input, which the rules forbid.',
                'Swapping only the root’s two children leaves each subtree unmirrored inside: in “Both subtrees change”, 1 with a left child 0 must become 1 with a right child 0.',
            ],
        },
        sources: [
            {title: 'Binary tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Binary_tree#Recursive_definition'},
            {title: 'Binary Tree as a Recursive Data Structure, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/RecursiveDS.html'},
            {title: 'Multiple Binary Trees, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/MultipleBinaryTrees.html'},
        ],
        hints: ['The new left branch is the inverted old right branch. Apply the same rule recursively.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function invert_tree(root)
{
    if (root === null) {
        return null;
    }
    return {
        value: root.value,
        left: invert_tree(root.right),
        right: invert_tree(root.left),
    };
}`,
        solution_php: `<?php

function invert_tree($root)
{
    if ($root === null) {
        return null;
    }
    return (object) [
        'value' => $root->value,
        'left' => invert_tree($root->right),
        'right' => invert_tree($root->left),
    ];
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Sparse branches', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Single node', args: [{value: 7, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Alternating single branches', args: [{value: 1, left: null, right: {value: 2, left: {value: 3, left: null, right: null}, right: null}}]},
            {label: 'Swap repeated-valued branches', args: [{value: 4, left: {value: 2, left: null, right: null}, right: {value: 2, left: null, right: {value: 8, left: null, right: null}}}]},
            {label: 'Both subtrees change', args: [{value: 4, left: {value: 1, left: {value: 0, left: null, right: null}, right: null}, right: {value: 8, left: {value: 6, left: null, right: null}, right: {value: 9, left: null, right: null}}}]},
            {label: 'Twenty-five nodes, generated', args: [{value: 67, left: {value: 24, left: {value: 51, left: {value: 94, left: {value: 17, left: null, right: {value: 7, left: {value: 2, left: null, right: null}, right: null}}, right: {value: 98, left: {value: 66, left: {value: 81, left: {value: 16, left: null, right: {value: 5, left: null, right: null}}, right: {value: 46, left: {value: 22, left: null, right: null}, right: null}}, right: {value: 69, left: null, right: null}}, right: {value: 16, left: null, right: null}}}, right: {value: 32, left: null, right: {value: 3, left: null, right: null}}}, right: {value: 14, left: {value: 36, left: null, right: {value: 86, left: null, right: null}}, right: {value: 86, left: null, right: null}}}, right: {value: 47, left: {value: 45, left: {value: 15, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'check-height-balance',
        group: 'Binary trees',
        level: 2,
        title: 'Check height balance',
        fn: 'is_height_balanced',
        params: ['root'],
        signature: 'function is_height_balanced(root)',
        brief: 'Return whether every node has left and right subtree heights that differ by at most one.',
        rules: ['Use height 0 for a missing branch and height 1 for a leaf. An empty tree is balanced.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'A tree is height-balanced when at every node the heights of the left and right subtrees differ by at most 1. Every node, not just the root: two subtrees of equal height can each be lopsided inside. It is the balance rule that AVL trees keep after every insert and delete.\n\nChecking each node with its own height computation works but measures the same subtrees again and again. The better way is one postorder pass in which a helper returns either the height of a subtree or a sentinel, -1, that means “unbalanced somewhere in here”. A node gets the answers from its two children; if either is -1, or they differ by more than 1, it returns -1 as well; otherwise it returns 1 + the larger. The tree is balanced when the root’s answer is not -1.\n\nPostorder is forced: a node can judge itself only once it knows both heights, and those come from below. A -1 is passed straight up, so the root hears of an imbalance anywhere in the tree.',
            example: 'The root 5 has no left child and a right child 8. For 5’s left, `null`, the height is 0. For 8 both children are `null`: heights 0 and 0, a difference of 0, so 8 has height 1. At 5 the heights are 0 and 1, a difference of 1, which is allowed, so 5 returns 2, not -1, and the answer is true. One more node under 8 would give 5 the heights 0 and 2, and the answer would be false.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls on the stack. A separate height call at every node costs O(n × h), O(n²) on a chain.',
            pitfalls: [
                'Comparing heights only at the root misses an imbalance lower down: in “Equal root heights hide an imbalance” both sides of the root have height 3, but the node 1 has heights 2 and 0.',
                'Counting heights in edges, with -1 for an empty tree, collides with -1 as the “unbalanced” sentinel: a missing branch then reads as a failure.',
                'Asking for a complete or perfect tree is too strict: a node with one leaf child and no other child is balanced.',
            ],
        },
        sources: [
            {title: 'AVL tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/AVL_tree#Balance_factor'},
            {title: 'Information Flow in Recursive Functions, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeInfFlw.html'},
            {title: 'AVL Tree visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/AVLtree.html'},
        ],
        hints: ['Return a subtree height from your helper. Use a distinct sentinel to report a subtree that failed the balance check.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function is_height_balanced(root)
{
    return subtree_height(root) !== -1;
    function subtree_height(current) {
        if (current === null) {
            return 0;
        }
        const left = subtree_height(current.left);
        const right = subtree_height(current.right);
        if ((left === -1) || (right === -1) || (Math.abs(left - right) > 1)) {
            return -1;
        }
        return 1 + Math.max(left, right);
    }
}`,
        solution_php: `<?php

function is_height_balanced($root)
{
    return is_height_balanced_height($root) !== -1;
}

function is_height_balanced_height($current)
{
    if ($current === null) {
        return 0;
    }
    $left = is_height_balanced_height($current->left);
    $right = is_height_balanced_height($current->right);
    if (($left === -1) || ($right === -1) || (abs($left - $right) > 1)) {
        return -1;
    }
    return 1 + max($left, $right);
}`,
        cases: [
            {label: 'Balanced but not perfectly symmetric', args: [{value: 5, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 4, left: null, right: null}}, right: {value: 8, left: null, right: null}}]},
            {label: 'Height difference at the root', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Equal root heights hide an imbalance', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: null, right: null}, right: null}, right: null}, right: {value: 4, left: {value: 5, left: {value: 6, left: null, right: null}, right: null}, right: {value: 7, left: null, right: null}}}]},
            {label: 'One missing branch is allowed', args: [{value: 1, left: null, right: {value: 2, left: null, right: null}}]},
            {label: 'Single node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 32, left: {value: 17, left: {value: 63, left: null, right: {value: 58, left: {value: 92, left: {value: 92, left: null, right: {value: 53, left: null, right: null}}, right: {value: 90, left: null, right: null}}, right: {value: 73, left: null, right: null}}}, right: {value: 31, left: {value: 64, left: null, right: null}, right: null}}, right: {value: 93, left: {value: 59, left: {value: 17, left: {value: 13, left: {value: 52, left: null, right: null}, right: null}, right: {value: 51, left: {value: 81, left: null, right: null}, right: null}}, right: {value: 94, left: {value: 66, left: {value: 21, left: {value: 79, left: null, right: {value: 68, left: null, right: null}}, right: null}, right: null}, right: {value: 73, left: {value: 42, left: null, right: null}, right: null}}}, right: null}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'check-mirror-symmetry',
        group: 'Binary trees',
        level: 2,
        title: 'Check mirror symmetry',
        fn: 'is_binary_tree_symmetric',
        params: ['root'],
        signature: 'function is_binary_tree_symmetric(root)',
        brief: 'Return whether the two sides are mirror images, including values and empty positions.',
        rules: ['An empty tree and a single node are symmetric.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'A tree is symmetric when its left subtree is the mirror image of its right subtree. In a mirror, left matches right, so the question is about pairs of nodes, one from each side, and not about comparing each side with itself.\n\nTwo subtrees a and b are mirrors when both are empty, or when both exist, have equal values, and a’s left mirrors b’s right (the outside pair) and a’s right mirrors b’s left (the inside pair). That is the helper `is_mirror(a, b)`, called on `root.left` and `root.right`. The empty tree is symmetric, and so is a single node, whose two missing children are a matching pair.\n\nWhen only one of a and b is `null`, the shapes differ and the answer is false at once, before any `.value` is read. Since `&&` stops at the first false, the walk ends at the first mismatch.',
            example: 'The root 5 has no left child and a right child 8. The function calls is_mirror(null, 8): one side is `null` and the other is not, so it returns false, and the tree is not symmetric. The 8 would need a partner, another 8, on the left of 5.',
            cost: 'Time O(n): each node takes part in one comparison. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Comparing left with left and right with right checks that the two sides are equal, not mirrored: in “Same side gap breaks the mirror” both sides are 2 with a left child 3, and the tree is not symmetric.',
                'Checking only the shape misses different values: “Different leaves” has the right shape with 2 and 3.',
                'Reading `a.value` before checking both sides for `null` throws when one side is missing.',
            ],
        },
        sources: [
            {title: 'Binary tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Binary_tree'},
            {title: 'Multiple Binary Trees, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/MultipleBinaryTrees.html'},
        ],
        hints: ['Compare the outside branches with each other, then the inside branches.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function is_binary_tree_symmetric(root)
{
    return (root === null) || is_mirror(root.left, root.right);
    function is_mirror(a, b) {
        if ((a === null) || (b === null)) {
            return a === b;
        }
        return (a.value === b.value) && is_mirror(a.left, b.right) && is_mirror(a.right, b.left);
    }
}`,
        solution_php: `<?php

function is_binary_tree_symmetric($root)
{
    return ($root === null) || is_binary_tree_symmetric_mirror($root->left, $root->right);
}

function is_binary_tree_symmetric_mirror($a, $b)
{
    if (($a === null) || ($b === null)) {
        return $a === $b;
    }
    return ($a->value === $b->value)
        && is_binary_tree_symmetric_mirror($a->left, $b->right)
        && is_binary_tree_symmetric_mirror($a->right, $b->left);
}`,
        cases: [
            {label: 'Matching outside and inside branches', args: [{value: 1, left: {value: 2, left: {value: 3, left: null, right: null}, right: {value: 4, left: null, right: null}}, right: {value: 2, left: {value: 4, left: null, right: null}, right: {value: 3, left: null, right: null}}}]},
            {label: 'Same side gap breaks the mirror', args: [{value: 1, left: {value: 2, left: {value: 3, left: null, right: null}, right: null}, right: {value: 2, left: {value: 3, left: null, right: null}, right: null}}]},
            {label: 'Different leaves', args: [{value: 1, left: {value: 2, left: null, right: null}, right: {value: 3, left: null, right: null}}]},
            {label: 'One node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 80, left: {value: 10, left: {value: 96, left: {value: 39, left: null, right: {value: 7, left: null, right: null}}, right: {value: 54, left: {value: 68, left: null, right: null}, right: null}}, right: {value: 39, left: null, right: null}}, right: {value: 63, left: {value: 36, left: null, right: {value: 80, left: {value: 67, left: null, right: null}, right: {value: 78, left: {value: 46, left: {value: 9, left: {value: 36, left: null, right: null}, right: null}, right: null}, right: null}}}, right: {value: 80, left: {value: 85, left: {value: 35, left: {value: 19, left: {value: 15, left: null, right: null}, right: null}, right: null}, right: {value: 31, left: {value: 63, left: null, right: null}, right: null}}, right: {value: 50, left: {value: 11, left: null, right: null}, right: null}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'find-the-kth-smallest-bst-value',
        group: 'Binary trees',
        level: 2,
        title: 'Find the kth smallest BST value',
        fn: 'bst_find_kth_smallest',
        params: ['root', 'k'],
        signature: 'function bst_find_kth_smallest(root, k)',
        brief: 'Return the kth smallest value in a valid strict binary search tree.',
        rules: ['k is one-based. Return null for an invalid k or a tree with fewer than k nodes.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}, k: 2}},
        explanation: {
            approach: 'In a binary search tree everything smaller than a node is in its left subtree and everything larger in its right, so inorder (left subtree, node, right subtree) visits the values in ascending order. The kth smallest value is therefore the kth value inorder, and the walk can stop the moment it gets there.\n\nThe iterative inorder walk with a stack makes stopping easy. From `current`, go left as far as possible, pushing each node. Pop one: it is the next value in ascending order. Count it by taking 1 off `remaining`, which starts at k; at 0, return its value. Otherwise go to the popped node’s right subtree and repeat. The stack holds the nodes whose left side is being walked and whose own turn is still to come.\n\nIf the stack runs out first, the tree has fewer than k nodes: return `null`. A k that is not a whole number of at least 1 is rejected before the walk.',
            example: 'The Task tab gives the tree, 5 with a right child 8, but no k; take k = 2. The walk pushes 5 and stops, since 5 has no left child. Pop 5: `remaining` goes from 2 to 1, not yet 0, so move to 5’s right, 8. Push 8, which has no left child, and pop it: `remaining` is 0, and the answer is 8. With k = 1 the answer is 5, the first pop; with k = 3 the stack runs out after 8, and the answer is `null`.',
            cost: 'Time O(h + k): the walk goes down to the smallest value, then takes k steps; O(n) at worst. Memory O(h) for the stack. Keeping a subtree size in every node, as an order statistic tree does, finds the kth value in O(h) without walking the k nodes before it.',
            pitfalls: [
                'Collecting the whole inorder array and taking `[k - 1]` visits every node even for k = 1, and gives `undefined`, not `null`, when k is past the end.',
                'Counting from 0 returns the next value: k = 1 is the smallest.',
                'Counting nodes as they are pushed instead of as they are popped counts them in the wrong order: a node is pushed before the smaller values on its left.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR'},
            {title: 'Order statistic tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Order_statistic_tree'},
            {title: 'Binary Search Tree visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/BST.html'},
        ],
        hints: ['Inorder visits BST keys in ascending order.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function bst_find_kth_smallest(root, k)
{
    if (!Number.isInteger(k) || (k < 1)) {
        return null;
    }
    let current = root;
    let remaining = k;

    const pending = [];
    while ((current !== null) || (pending.length > 0)) {
        while (current !== null) {
            pending.push(current);
            current = current.left;
        }
        current = pending.pop();
        --remaining;
        if (remaining === 0) {
            return current.value;
        }
        current = current.right;
    }
    return null;
}`,
        solution_php: `<?php

function bst_find_kth_smallest($root, $k)
{
    if (!is_int($k) || ($k < 1)) {
        return null;
    }
    $current = $root;
    $remaining = $k;
    $pending = [];
    while (($current !== null) || (count($pending) > 0)) {
        while ($current !== null) {
            $pending[] = $current;
            $current = $current->left;
        }
        $current = array_pop($pending);
        --$remaining;
        if ($remaining === 0) {
            return $current->value;
        }
        $current = $current->right;
    }
    return null;
}`,
        cases: [
            {label: 'First key', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}, 1]},
            {label: 'Middle key', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}, 5]},
            {label: 'Last key', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}, 9]},
            {label: 'Out of range', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}, 10]},
            {label: 'Invalid rank', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}, 0]},
            {label: 'Empty tree', args: [null, 1]},
            {label: 'The seventh of twenty-five, generated', args: [{value: 116, left: {value: 103, left: {value: 24, left: null, right: {value: 68, left: {value: 51, left: {value: 46, left: {value: 42, left: null, right: null}, right: null}, right: null}, right: {value: 89, left: {value: 87, left: {value: 76, left: null, right: null}, right: null}, right: {value: 93, left: {value: 90, left: null, right: {value: 91, left: null, right: {value: 92, left: null, right: null}}}, right: null}}}}, right: {value: 114, left: null, right: null}}, right: {value: 172, left: {value: 137, left: {value: 121, left: null, right: {value: 131, left: null, right: {value: 136, left: null, right: null}}}, right: {value: 166, left: {value: 148, left: null, right: null}, right: null}}, right: {value: 175, left: null, right: {value: 188, left: {value: 181, left: null, right: null}, right: null}}}}, 7]},
        ],
    },
    {
        uid: 'validate-a-search-tree',
        group: 'Binary trees',
        level: 3,
        title: 'Validate a search tree',
        fn: 'is_valid_bst',
        params: ['root'],
        signature: 'function is_valid_bst(root)',
        brief: 'Return whether the binary tree satisfies the strict search tree property.',
        rules: ['Every value in a left subtree must be smaller than its ancestor, and every value in a right subtree must be greater. Duplicate values are invalid. An empty tree is valid.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'The search tree property is about whole subtrees, not only children: every value in a node’s left subtree must be smaller than the node, and every value in its right subtree larger. Checking each node against its parent is not enough: a node deep in the left subtree of 8 can be larger than its own parent and still have to be smaller than 8.\n\nSo pass down the range a node’s value must fall in. The root may be anything, `(-Infinity, Infinity)`. Going left from a node with value v keeps the lower bound and makes v the upper bound; going right keeps the upper bound and makes v the lower bound. Each range is narrowed by all the ancestors on the way down, so a node is checked against every one of them at once. The bounds are exclusive, which rules out duplicates.\n\n`valid(node, min, max)` returns true for `null`, false when the value is not strictly between `min` and `max`, and otherwise the answer for both children with their narrower ranges. Another way to the same answer: an inorder walk of a valid tree is strictly increasing, so it is enough to compare each value with the one before it.',
            example: 'The root 5 has no left child and a right child 8. valid(5, -Infinity, Infinity): 5 is inside the range. Its left is `null`, which is valid. Its right is checked with the range (5, Infinity): 8 is inside it, and both its children are `null`. The answer is true. Had the right child been 3, it would fall outside (5, Infinity) and the answer would be false.',
            cost: 'Time O(n): each node is checked once, and `&&` stops at the first failure. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Comparing a node only with its children passes “Ancestor bound crossed”: 9 is a fine right child of 3 but sits in the left subtree of 8.',
                'Using `<` and `>` where `<=` and `>=` are needed lets duplicates through: “Duplicate ancestor across levels” has an 8 in the right subtree of the root 8.',
                'Starting the range at `Number.MIN_VALUE`, which is the smallest positive number and not the most negative one, rejects the negative values of “Negative keys”: start at `-Infinity`.',
            ],
        },
        sources: [
            {title: 'Binary search tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Binary_search_tree'},
            {title: 'A Hard Information Flow Problem, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BSTCheck.html'},
            {title: 'Binary Search Tree visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/BST.html'},
        ],
        hints: ['Carry a lower and upper bound down the tree. A node may satisfy its parent’s rule and still violate an earlier ancestor’s bound.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function is_valid_bst(root)
{
    function valid(current, min, max) {
        if (current === null) {
            return true;
        }
        if ((current.value <= min) || (current.value >= max)) {
            return false;
        }
        return valid(current.left, min, current.value) && valid(current.right, current.value, max);
    }
    return valid(root, -Infinity, Infinity);
}`,
        solution_php: `<?php

function is_valid_bst($root)
{
    return is_valid_bst_within($root, -INF, INF);
}

function is_valid_bst_within($current, $min, $max)
{
    if ($current === null) {
        return true;
    }
    if (($current->value <= $min) || ($current->value >= $max)) {
        return false;
    }
    return is_valid_bst_within($current->left, $min, $current->value)
        && is_valid_bst_within($current->right, $current->value, $max);
}`,
        cases: [
            {label: 'Valid tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Ancestor bound crossed', args: [{value: 8, left: {value: 3, left: null, right: {value: 9, left: null, right: null}}, right: {value: 12, left: null, right: null}}]},
            {label: 'Duplicate value', args: [{value: 2, left: {value: 2, left: null, right: null}, right: null}]},
            {label: 'Negative keys', args: [{value: -5, left: {value: -9, left: null, right: null}, right: {value: 0, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Cross the bound from the right', args: [{value: 8, left: {value: 3, left: null, right: null}, right: {value: 12, left: {value: 7, left: null, right: null}, right: null}}]},
            {label: 'Duplicate ancestor across levels', args: [{value: 8, left: null, right: {value: 12, left: {value: 8, left: null, right: null}, right: null}}]},
            {label: 'A valid descending chain', args: [{value: 7, left: {value: 2, left: {value: 0, left: {value: -3, left: null, right: null}, right: null}, right: null}, right: null}]},
            {label: 'A search tree of twenty-five, generated', args: [{value: 81, left: {value: 32, left: {value: 30, left: {value: 16, left: {value: 5, left: null, right: {value: 7, left: null, right: null}}, right: null}, right: null}, right: {value: 47, left: {value: 44, left: {value: 34, left: null, right: null}, right: null}, right: {value: 54, left: null, right: {value: 70, left: null, right: null}}}}, right: {value: 106, left: {value: 82, left: null, right: {value: 86, left: null, right: null}}, right: {value: 138, left: {value: 135, left: {value: 108, left: null, right: {value: 123, left: {value: 109, left: null, right: null}, right: {value: 126, left: {value: 125, left: null, right: null}, right: null}}}, right: null}, right: {value: 169, left: {value: 160, left: {value: 143, left: null, right: {value: 147, left: null, right: null}}, right: null}, right: null}}}}]},
            {label: 'Leaning left, twenty deep, not ordered', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'find-the-diameter',
        group: 'Binary trees',
        level: 3,
        title: 'Find the diameter',
        fn: 'tree_diameter',
        params: ['root'],
        signature: 'function tree_diameter(root)',
        brief: 'Return the number of edges in the longest path between any two nodes of a binary tree.',
        rules: ['The path can be entirely inside one subtree. A single node or an empty tree has diameter 0.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Every path in a tree has one highest node, where it turns from going up to going down. The longest path that turns at a given node goes as far down its left side as it can and as far down its right side as it can, so its length in edges is the height of the left subtree plus the height of the right subtree, with height counted in nodes and `null` as 0.\n\nThe diameter is the largest of these sums over all nodes. The best node is not always the root: the longest path can lie inside one subtree, as in “Longest path avoids root”.\n\nOne postorder pass computes it all. `height(node)` gets the heights of both children, updates the best sum, `out = max(out, left + right)`, and returns `1 + max(left, right)` to its parent. When it is done, `out` holds the diameter; an empty tree and a single node leave it at 0.',
            example: 'The root 5 has no left child and a right child 8. height(8) sees two `null` children, heights 0 and 0, a sum of 0, and returns 1. At 5 the heights are 0 and 1, the sum is 1, so `out` becomes 1, and height(5) returns 2. The diameter is 1: the one edge from 5 to 8.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls on the stack. Computing the two heights from scratch at every node would be O(n × h), O(n²) on a chain.',
            pitfalls: [
                'Taking only `left + right` at the root misses a longer path inside a subtree: “Longest path avoids root” has a diameter of 4, while the root sees 3 + 0 = 3.',
                'Counting nodes instead of edges gives one too many: two nodes joined by one edge have diameter 1, not 2.',
                'Returning the best sum from the helper instead of the height mixes up the two numbers: the parent needs its children’s heights to compute its own sum.',
            ],
        },
        sources: [
            {title: 'Distance (graph theory), Wikipedia', url: 'https://en.wikipedia.org/wiki/Distance_(graph_theory)#diameter'},
            {title: 'Information Flow in Recursive Functions, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeInfFlw.html'},
        ],
        hints: ['As you compute heights, track the largest sum of left and right heights seen at any node.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function tree_diameter(root)
{
    let out = 0;
    function height(current) {
        if (current === null) {
            return 0;
        }
        const left = height(current.left);
        const right = height(current.right);
        out = Math.max(out, left + right);
        return 1 + Math.max(left, right);
    }
    height(root);
    return out;
}`,
        solution_php: `<?php

function tree_diameter($root)
{
    $out = 0;
    tree_diameter_height($root, $out);
    return $out;
}

function tree_diameter_height($current, &$out)
{
    if ($current === null) {
        return 0;
    }
    $left = tree_diameter_height($current->left, $out);
    $right = tree_diameter_height($current->right, $out);
    $out = max($out, $left + $right);
    return 1 + max($left, $right);
}`,
        cases: [
            {label: 'Branching tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Longest path avoids root', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: null, right: null}, right: null}, right: {value: 4, left: null, right: {value: 5, left: null, right: null}}}, right: null}]},
            {label: 'One-sided tree', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Single node', args: [{value: 1, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Two nodes share one edge', args: [{value: 7, left: null, right: {value: 7, left: null, right: null}}]},
            {label: 'Longest path crosses the root', args: [{value: 4, left: {value: 1, left: {value: 0, left: null, right: null}, right: null}, right: {value: 8, left: {value: 6, left: null, right: null}, right: {value: 9, left: null, right: null}}}]},
            {label: 'Equal values on distinct nodes', args: [{value: 1, left: {value: 1, left: {value: 1, left: null, right: null}, right: null}, right: {value: 1, left: null, right: {value: 1, left: null, right: null}}}]},
            {label: 'Twenty-five nodes, generated', args: [{value: 66, left: {value: 94, left: {value: 25, left: null, right: {value: 60, left: {value: 22, left: null, right: null}, right: {value: 24, left: null, right: null}}}, right: {value: 90, left: {value: 1, left: null, right: null}, right: {value: 27, left: {value: 50, left: {value: 26, left: null, right: null}, right: {value: 71, left: null, right: null}}, right: {value: 23, left: null, right: {value: 78, left: null, right: null}}}}}, right: {value: 58, left: {value: 22, left: {value: 7, left: null, right: null}, right: {value: 8, left: {value: 34, left: null, right: {value: 51, left: null, right: null}}, right: {value: 11, left: null, right: {value: 16, left: null, right: null}}}}, right: {value: 79, left: null, right: {value: 74, left: null, right: {value: 55, left: null, right: null}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'inorder-binary-traversal',
        group: 'Binary traversal',
        level: 1,
        title: 'Inorder binary traversal',
        fn: 'binary_tree_traverse_inorder',
        params: ['root'],
        signature: 'function binary_tree_traverse_inorder(root)',
        brief: 'Return the values in inorder. Visit the left subtree, the current node, then the right subtree.',
        rules: ['Keep repeated values. The input can be any binary tree. Return an empty array for a null root.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Inorder visits the whole left subtree, then the node, then the whole right subtree, written LNR. As a recursive function that is three lines: visit `left`, push `node.value`, visit `right`, with `null` as the case that does nothing.\n\nIts fame comes from search trees: there everything in a node’s left subtree is smaller and everything in its right subtree larger, so inorder lists the values in ascending order. That is a property of search trees, not of inorder. The input here can be any binary tree, and then the output simply follows the shape.\n\nThe helper appends to one shared `out` array. Without recursion, a stack gives the same order: go left pushing nodes, pop one and emit it, then go to its right.',
            example: 'The root 5 has no left child and a right child 8. visit(5) first visits its left, `null`, which does nothing, then pushes 5, then visits 8: 8’s left is `null`, 8 is pushed, and 8’s right is `null`. The result is [5, 8].',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the output and O(h) for the calls on the stack, 20 deep on “Leaning left, twenty deep”.',
            pitfalls: [
                'Sorting the values instead of walking the tree is right only for search trees: “Inorder need not be sorted” expects [9, 0, 6, 4].',
                'Calling `visit(current.left)` with no `null` check at the top of `visit` throws at the first missing child.',
                'Collecting the values in a Set drops repeated values: three nodes of value 3 must give [3, 3, 3], not [3].',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR'},
            {title: 'Binary Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeTraversal.html'},
        ],
        hints: ['Place the append between the two recursive calls.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_inorder(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (current === null) {
            return;
        }
        visit(current.left);
        out.push(current.value);
        visit(current.right);
    }
}`,
        solution_php: `<?php

function binary_tree_traverse_inorder($root)
{
    $out = [];
    binary_tree_traverse_inorder_visit($root, $out);
    return $out;
}

function binary_tree_traverse_inorder_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    binary_tree_traverse_inorder_visit($current->left, $out);
    $out[] = $current->value;
    binary_tree_traverse_inorder_visit($current->right, $out);
}`,
        cases: [
            {label: 'Inorder of a search tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Inorder need not be sorted', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Missing right branch', args: [{value: 2, left: {value: 1, left: null, right: null}, right: null}]},
            {label: 'Missing left branch', args: [{value: 2, left: null, right: {value: 1, left: null, right: null}}]},
            {label: 'Equal values on both sides', args: [{value: 3, left: {value: 3, left: null, right: null}, right: {value: 3, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 73, left: {value: 36, left: {value: 57, left: {value: 75, left: {value: 76, left: {value: 40, left: {value: 48, left: {value: 60, left: null, right: null}, right: null}, right: null}, right: null}, right: {value: 62, left: null, right: {value: 87, left: null, right: {value: 4, left: null, right: null}}}}, right: {value: 50, left: null, right: {value: 17, left: null, right: {value: 96, left: null, right: null}}}}, right: {value: 38, left: {value: 66, left: null, right: {value: 77, left: {value: 44, left: {value: 53, left: null, right: null}, right: null}, right: null}}, right: null}}, right: {value: 52, left: {value: 99, left: null, right: {value: 36, left: null, right: null}}, right: {value: 72, left: {value: 49, left: null, right: null}, right: {value: 62, left: null, right: null}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'binary-preorder',
        group: 'Binary traversal',
        level: 1,
        title: 'Binary preorder',
        fn: 'binary_tree_traverse_preorder',
        params: ['root'],
        signature: 'function binary_tree_traverse_preorder(root)',
        brief: 'Return the values in root, left, right order.',
        rules: ['Visit the whole left subtree before the right one. Keep duplicate values. A missing root returns [].'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Preorder emits a node before anything below it: the node, then its whole left subtree, then its whole right subtree, written NLR. It is the order in which a depth-first walk first reaches each node, and the one used to copy or print a tree from the top down, since every parent comes before its children.\n\nRecursively: if the node is `null`, return; push `node.value`; visit `left`; visit `right`. The right subtree waits until the whole left subtree is done, and the call stack does that waiting.\n\nIteratively, an explicit stack does the same: pop a node, emit it, then push its right child and then its left child, so that the left one is popped first.',
            example: 'The root 5 has no left child and a right child 8. visit(5) pushes 5, visits its left, `null`, which returns at once, and then visits 8, which pushes 8 and has two `null` children. The result is [5, 8]. Inorder gives the same here only because 5 has no left subtree: for 2 with children 1 and 3, preorder is [2, 1, 3] and inorder [1, 2, 3].',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the output and O(h) for the calls on the stack.',
            pitfalls: [
                'In the stack version, pushing the left child before the right one pops the right subtree first.',
                'Taking nodes from the front of the array, a queue, instead of the back, a stack, gives a breadth-first order, which differs as soon as the left subtree has two levels: “Uneven search tree” wants 8, 3, 1, 6, ..., the whole left subtree before 10.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Binary Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeTraversal.html'},
            {title: 'Implementing Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/WritingTraversals.html'},
        ],
        hints: ['Emit the root before recursing into either branch.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_preorder(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (current === null) {
            return;
        }
        out.push(current.value);
        visit(current.left);
        visit(current.right);
    }
}`,
        solution_php: `<?php

function binary_tree_traverse_preorder($root)
{
    $out = [];
    binary_tree_traverse_preorder_visit($root, $out);
    return $out;
}

function binary_tree_traverse_preorder_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    $out[] = $current->value;
    binary_tree_traverse_preorder_visit($current->left, $out);
    binary_tree_traverse_preorder_visit($current->right, $out);
}`,
        cases: [
            {label: 'Uneven search tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Right-only root', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Repeated values', args: [{value: 2, left: {value: 2, left: null, right: null}, right: {value: 2, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 47, left: {value: 23, left: null, right: null}, right: {value: 80, left: {value: 11, left: {value: 19, left: null, right: null}, right: {value: 93, left: null, right: null}}, right: {value: 12, left: {value: 43, left: null, right: {value: 75, left: {value: 25, left: null, right: {value: 63, left: {value: 76, left: null, right: null}, right: null}}, right: null}}, right: {value: 54, left: {value: 73, left: null, right: {value: 23, left: null, right: {value: 61, left: null, right: null}}}, right: {value: 93, left: {value: 56, left: null, right: {value: 48, left: {value: 64, left: null, right: null}, right: null}}, right: {value: 73, left: {value: 24, left: null, right: null}, right: {value: 44, left: {value: 24, left: {value: 15, left: null, right: null}, right: null}, right: null}}}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'binary-postorder',
        group: 'Binary traversal',
        level: 1,
        title: 'Binary postorder',
        fn: 'binary_tree_traverse_postorder',
        params: ['root'],
        signature: 'function binary_tree_traverse_postorder(root)',
        brief: 'Return the values in left, right, root order.',
        rules: ['Complete both subtrees before emitting the parent. Keep duplicates and return [] for an empty tree.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Postorder emits a node after both of its subtrees: left subtree, right subtree, node, written LRN. Every node comes after all its descendants, so the root is last. It is the order for work where a parent needs its children done first: freeing a tree, computing heights or sizes, evaluating an expression tree.\n\nRecursively it is preorder with the push moved to the end: visit `left`, visit `right`, then push `node.value`.\n\nIteratively it is the hardest of the three orders, because a node has to wait until both subtrees are done. A common trick: walk node, right, left with a stack, like preorder with the sides swapped, and reverse the result, since the reverse of node, right, left is left, right, node.',
            example: 'The root 5 has no left child and a right child 8. visit(5) visits its left, `null`, then its right: visit(8) visits two `null` children and pushes 8. Back at 5 both sides are done, so 5 is pushed. The result is [8, 5]: the root last.',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the output and O(h) for the calls on the stack.',
            pitfalls: [
                'Pushing the value before the two calls gives preorder: [5, 8] instead of [8, 5].',
                'Swapping the two calls gives right, left, node: on “Uneven search tree” the right subtree’s 13, 14, 10 would come out before the left subtree’s values.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'Binary Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeTraversal.html'},
        ],
        hints: ['Emit the current value after both child calls.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_postorder(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (current === null) {
            return;
        }
        visit(current.left);
        visit(current.right);
        out.push(current.value);
    }
}`,
        solution_php: `<?php

function binary_tree_traverse_postorder($root)
{
    $out = [];
    binary_tree_traverse_postorder_visit($root, $out);
    return $out;
}

function binary_tree_traverse_postorder_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    binary_tree_traverse_postorder_visit($current->left, $out);
    binary_tree_traverse_postorder_visit($current->right, $out);
    $out[] = $current->value;
}`,
        cases: [
            {label: 'Uneven search tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Right-only root', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Repeated values', args: [{value: 2, left: {value: 2, left: null, right: null}, right: {value: 2, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 70, left: {value: 69, left: {value: 25, left: null, right: {value: 6, left: null, right: {value: 72, left: null, right: null}}}, right: {value: 39, left: {value: 68, left: {value: 92, left: null, right: null}, right: null}, right: {value: 69, left: null, right: {value: 10, left: null, right: {value: 20, left: null, right: null}}}}}, right: {value: 82, left: null, right: {value: 71, left: {value: 5, left: null, right: {value: 12, left: null, right: {value: 57, left: null, right: {value: 85, left: null, right: null}}}}, right: {value: 33, left: {value: 29, left: null, right: null}, right: {value: 58, left: {value: 27, left: {value: 95, left: {value: 46, left: null, right: null}, right: {value: 53, left: null, right: null}}, right: null}, right: {value: 98, left: null, right: null}}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'binary-level-order',
        group: 'Binary traversal',
        level: 1,
        title: 'Binary level order',
        fn: 'binary_tree_traverse_level_order',
        params: ['root'],
        signature: 'function binary_tree_traverse_level_order(root)',
        brief: 'Return all values in breadth-first order.',
        rules: ['Visit left before right within a level. Include only existing nodes and keep duplicate values.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Level order lists the root, then all the nodes at depth 1 from left to right, then depth 2, and so on. It is breadth-first search on a tree: nodes are reached in order of their distance from the root.\n\nThe tool is a queue, first in, first out. Start with the root in it; again and again take the node at the front, emit its value, and add its existing children at the back, left first. Why it works: every node of depth d + 1 is added when its parent, at depth d, is taken out, so all of depth d is in the queue before any of depth d + 1, and within a depth the left-to-right order of the parents carries over to their children.\n\nIn JavaScript, `queue.shift()` re-indexes all the remaining elements, which can make each step O(n) on a big tree; reading the array with an index `i` that only moves forward keeps each step O(1). The reference also records each node’s depth and groups the values by it, which gives the same flat order.',
            example: 'The root 5 has no left child and a right child 8. The queue starts as [5]. Take 5 and emit it; its left is `null` and is skipped, its right, 8, is added: the queue is [8]. Take 8 and emit it; it has no children. The queue is empty, and the result is [5, 8].',
            cost: 'Time O(n): each node enters and leaves the queue once. Memory O(n): the array used as a queue ends up holding every node. A queue that drops the nodes it has taken holds O(w) at a time, w the width of the widest level, about n/2 in a full tree.',
            pitfalls: [
                'A stack instead of a queue gives a depth-first order: on “Uneven search tree”, 8, 10, 14, ... instead of 8, 3, 10, ...',
                'Adding `null` children to the queue and emitting them puts `null` into the result: only existing nodes count.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Breadth First Search, cp-algorithms', url: 'https://cp-algorithms.com/graph/breadth-first-search.html'},
            {title: 'Queues, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Queue.html'},
        ],
        hints: ['Queue each existing left or right child as you visit its parent.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_level_order(root)
{
    if (root === null) {
        return [];
    }
    let i = 0;

    const levels = [];
    const queue = [{node: root, depth: 0}];
    while (i < queue.length) {
        const {node: current, depth} = queue[i++];
        levels[depth] ??= [];
        levels[depth].push(current.value);
        if (current.left !== null) {
            queue.push({node: current.left, depth: depth + 1});
        }
        if (current.right !== null) {
            queue.push({node: current.right, depth: depth + 1});
        }
    }
    return levels.flat();
}`,
        solution_php: `<?php

function binary_tree_traverse_level_order($root)
{
    if ($root === null) {
        return [];
    }
    $i = 0;
    $levels = [];
    $queue = [[$root, 0]];
    while ($i < count($queue)) {
        [$current, $depth] = $queue[$i++];
        $levels[$depth][] = $current->value;
        if ($current->left !== null) {
            $queue[] = [$current->left, $depth + 1];
        }
        if ($current->right !== null) {
            $queue[] = [$current->right, $depth + 1];
        }
    }
    return array_merge(...$levels);
}`,
        cases: [
            {label: 'Uneven search tree', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'One-sided shape', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Single leaf', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 31, left: {value: 20, left: {value: 76, left: {value: 16, left: null, right: {value: 17, left: {value: 39, left: null, right: null}, right: {value: 34, left: null, right: null}}}, right: {value: 84, left: {value: 64, left: null, right: null}, right: null}}, right: {value: 50, left: null, right: {value: 27, left: null, right: {value: 48, left: null, right: null}}}}, right: {value: 25, left: {value: 76, left: {value: 1, left: null, right: {value: 63, left: null, right: {value: 61, left: {value: 18, left: null, right: {value: 10, left: null, right: {value: 3, left: null, right: null}}}, right: {value: 27, left: null, right: null}}}}, right: null}, right: {value: 78, left: {value: 90, left: {value: 79, left: null, right: null}, right: {value: 74, left: null, right: null}}, right: null}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'reverse-binary-inorder',
        group: 'Binary traversal',
        level: 1,
        title: 'Reverse binary inorder',
        fn: 'binary_tree_traverse_reverse_inorder',
        params: ['root'],
        signature: 'function binary_tree_traverse_reverse_inorder(root)',
        brief: 'Visit the right subtree, then the node, then the left subtree.',
        rules: ['Keep repeated values and return [] for an empty tree.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Reverse inorder is inorder with the two sides swapped: right subtree, node, left subtree, written RNL. The walk is the mirror image of inorder, so its output is exactly the inorder output backwards.\n\nIn a search tree inorder is ascending, so reverse inorder is descending, largest value first. That is how you list the k largest values or walk a search tree from the top without sorting. For a tree that is not a search tree, the output just follows the shape.\n\nThe code is inorder with the two recursive calls swapped: visit `right`, push `node.value`, visit `left`.',
            example: 'The root 5 has no left child and a right child 8. visit(5) first visits its right, 8: 8’s right is `null`, 8 is pushed, 8’s left is `null`. Back at 5, 5 is pushed, then its left, `null`, is visited. The result is [8, 5], the inorder [5, 8] reversed.',
            cost: 'Time O(n): each node is visited once. Memory O(n) for the output and O(h) for the calls on the stack.',
            pitfalls: [
                'Sorting the values in descending order matches only for search trees: “Shape matters in a general tree” expects [4, 6, 0, 9].',
                'Emitting the node before its right subtree gives node, right, left, a reverse preorder, not reverse inorder.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Reverse_in-order,_RNL'},
            {title: 'Binary Tree Traversals, OpenDSA', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BinaryTreeTraversal.html'},
        ],
        hints: ['Swap the two recursive branches in ordinary inorder traversal.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_reverse_inorder(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (current === null) {
            return;
        }
        visit(current.right);
        out.push(current.value);
        visit(current.left);
    }
}`,
        solution_php: `<?php

function binary_tree_traverse_reverse_inorder($root)
{
    $out = [];
    binary_tree_traverse_reverse_inorder_visit($root, $out);
    return $out;
}

function binary_tree_traverse_reverse_inorder_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    binary_tree_traverse_reverse_inorder_visit($current->right, $out);
    $out[] = $current->value;
    binary_tree_traverse_reverse_inorder_visit($current->left, $out);
}`,
        cases: [
            {label: 'Search tree gives descending keys', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Shape matters in a general tree', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Duplicate values', args: [{value: 1, left: {value: 1, left: null, right: null}, right: {value: 1, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 86, left: {value: 95, left: {value: 8, left: {value: 57, left: {value: 27, left: null, right: null}, right: {value: 21, left: {value: 68, left: null, right: null}, right: null}}, right: {value: 14, left: {value: 44, left: {value: 88, left: null, right: null}, right: {value: 46, left: null, right: null}}, right: {value: 93, left: null, right: null}}}, right: {value: 85, left: {value: 32, left: {value: 84, left: {value: 14, left: {value: 50, left: null, right: null}, right: {value: 64, left: null, right: null}}, right: {value: 95, left: null, right: null}}, right: {value: 42, left: {value: 75, left: null, right: null}, right: {value: 49, left: {value: 30, left: null, right: null}, right: {value: 8, left: null, right: null}}}}, right: {value: 61, left: null, right: null}}}, right: null}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'vertical-order-traversal',
        group: 'Binary traversal',
        level: 2,
        title: 'Vertical order traversal',
        fn: 'binary_tree_traverse_vertical',
        params: ['root'],
        signature: 'function binary_tree_traverse_vertical(root)',
        brief: 'Return one array per column, from the leftmost to rightmost column.',
        rules: ['The root is in column 0. Left subtracts 1 and right adds 1. Within each column use breadth-first order, with left before right for ties.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Give every node a column: the root is 0, a left child is its parent’s column minus 1, a right child plus 1. The output is the columns from the leftmost to the rightmost, each listing its nodes from top to bottom, and nodes at the same depth from left to right. A node’s column depends only on the path to it, so it travels with the node.\n\nBreadth-first search gives exactly the order wanted inside a column: it takes the nodes depth by depth, and left to right within a depth. So run BFS with a queue of `{node, column}` pairs and append each value to its column’s list in a Map. Each list is in the right order as it is built; nothing inside a column needs sorting.\n\nThe Map holds the columns in the order they were first reached, not from left to right. Sort the column keys numerically, `(a, b) => a - b`, and read out their lists. Columns can be negative, which is why a Map is easier than an array indexed by column.',
            example: 'The root 5 has no left child and a right child 8. The queue starts with {5, column 0}. Take it: column 0 gets [5], and 8 goes in with column 1. Take {8, 1}: column 1 gets [8]. The keys 0 and 1 sorted are [0, 1], so the result is [[5], [8]]. In “Tied depth uses left to right, not value order”, 9 and 3 both land in column 0 at depth 2, and 9 comes first because BFS reaches the left side first: [[2], [1, 9, 3], [4]].',
            cost: 'Time O(n + c log c), c the number of columns, at most n: the BFS is O(n) and only the keys are sorted. Memory O(n) for the queue and the lists.',
            pitfalls: [
                'A depth-first walk puts every node in the right column but in the wrong place inside it: a deep node on the left side gets there before a shallower one on the right side.',
                'Sorting the keys with plain `sort()` compares them as strings: [-2, -1, 0, 1, 2, 10] comes out as [-1, -2, 0, 1, 10, 2].',
                'Sorting each column by value breaks the rule: ties at a depth go left to right, as “Tied depth uses left to right, not value order” checks.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'},
            {title: 'Array.prototype.sort(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description'},
        ],
        hints: ['Carry a column number along with the node in your queue.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_vertical(root)
{
    if (root === null) {
        return [];
    }
    let i = 0;

    const queue = [{node: root, column: 0}];
    const values_by_column = new Map();
    while (i < queue.length) {
        const {node, column} = queue[i++];
        if (!values_by_column.has(column)) {
            values_by_column.set(column, []);
        }
        values_by_column.get(column).push(node.value);
        if (node.left !== null) {
            queue.push({node: node.left, column: column - 1});
        }
        if (node.right !== null) {
            queue.push({node: node.right, column: column + 1});
        }
    }
    const columns = [...values_by_column.keys()].sort((a, b) => a - b);
    return columns.map(v => values_by_column.get(v));
}`,
        solution_php: `<?php

function binary_tree_traverse_vertical($root)
{
    if ($root === null) {
        return [];
    }
    $i = 0;
    $queue = [[$root, 0]];
    $values_by_column = [];
    while ($i < count($queue)) {
        [$node, $column] = $queue[$i++];
        $values_by_column[$column][] = $node->value;
        if ($node->left !== null) {
            $queue[] = [$node->left, $column - 1];
        }
        if ($node->right !== null) {
            $queue[] = [$node->right, $column + 1];
        }
    }
    ksort($values_by_column);
    return array_values($values_by_column);
}`,
        cases: [
            {label: 'Tied depth uses left to right, not value order', args: [{value: 1, left: {value: 2, left: null, right: {value: 9, left: null, right: null}}, right: {value: 4, left: {value: 3, left: null, right: null}, right: null}}]},
            {label: 'Negative columns and gaps', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Single column', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 93, left: {value: 81, left: {value: 94, left: null, right: {value: 96, left: null, right: null}}, right: {value: 51, left: {value: 36, left: null, right: null}, right: null}}, right: {value: 74, left: {value: 90, left: null, right: null}, right: {value: 73, left: {value: 49, left: {value: 19, left: {value: 20, left: {value: 94, left: {value: 66, left: {value: 25, left: null, right: {value: 73, left: null, right: null}}, right: null}, right: null}, right: null}, right: {value: 13, left: {value: 57, left: null, right: null}, right: {value: 75, left: {value: 4, left: {value: 9, left: null, right: null}, right: {value: 59, left: null, right: null}}, right: {value: 91, left: null, right: null}}}}, right: {value: 17, left: null, right: null}}, right: {value: 91, left: null, right: null}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'diagonal-order-traversal',
        group: 'Binary traversal',
        level: 2,
        title: 'Diagonal order traversal',
        fn: 'binary_tree_traverse_diagonal',
        params: ['root'],
        signature: 'function binary_tree_traverse_diagonal(root)',
        brief: 'Group nodes by the number of left turns from the root.',
        rules: ['A right edge stays on the same diagonal. A left edge starts the next diagonal. Within a diagonal use breadth-first order, with left before right for ties.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'A diagonal here is a line that slopes down to the right. A step to a right child stays on the line; a step to a left child moves onto the next one. So a node’s diagonal is the number of left edges on its path from the root: the root and its chain of right children are diagonal 0, their left children start diagonal 1, and so on.\n\nLike the column in vertical order, the diagonal travels with the node: a right child gets its parent’s diagonal, a left child its parent’s plus 1. Run BFS with a queue of `{node, diagonal}` and append each value to `out[diagonal]`. BFS order is the order the rules want inside a diagonal: by depth, then left to right.\n\nDiagonals start at 0, and every node of diagonal d + 1 hangs, somewhere above it, from a node of diagonal d, which BFS has taken out earlier. So `out[d]` always exists before `out[d + 1]` is first used: `out` fills from index 0 without gaps and is the answer as it stands, with no sorting.',
            example: 'The root 5 has no left child and a right child 8. Take {5, 0}: diagonal 0 gets [5], and 8, a right child, goes in with diagonal 0 too. Take {8, 0}: diagonal 0 becomes [5, 8]. The result is [[5, 8]]: a chain of right children is one diagonal. On “Several diagonals”, the 8, 3, 10 tree, the result is [[8, 10, 14], [3, 6, 7, 13], [1, 4]].',
            cost: 'Time O(n): each node enters and leaves the queue once. Memory O(n) for the queue and the result.',
            pitfalls: [
                'Adding 1 on the right edge instead of the left one groups by right turns: “Right-only chain” must stay one diagonal, [[1, 2, 3]].',
                'The common recursive version, left child before right, puts each node in the right diagonal but can list a deep node from the left part of the tree before a shallower one from the right part.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Breadth First Search, cp-algorithms', url: 'https://cp-algorithms.com/graph/breadth-first-search.html'},
        ],
        hints: ['Carry the diagonal number in a breadth-first queue.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_diagonal(root)
{
    if (root === null) {
        return [];
    }
    let i = 0;

    const out = [];
    const queue = [{node: root, diagonal: 0}];
    while (i < queue.length) {
        const {node, diagonal} = queue[i++];
        out[diagonal] ??= [];
        out[diagonal].push(node.value);
        if (node.left !== null) {
            queue.push({node: node.left, diagonal: diagonal + 1});
        }
        if (node.right !== null) {
            queue.push({node: node.right, diagonal});
        }
    }
    return out;
}`,
        solution_php: `<?php

function binary_tree_traverse_diagonal($root)
{
    if ($root === null) {
        return [];
    }
    $i = 0;
    $out = [];
    $queue = [[$root, 0]];
    while ($i < count($queue)) {
        [$node, $diagonal] = $queue[$i++];
        $out[$diagonal][] = $node->value;
        if ($node->left !== null) {
            $queue[] = [$node->left, $diagonal + 1];
        }
        if ($node->right !== null) {
            $queue[] = [$node->right, $diagonal];
        }
    }
    return $out;
}`,
        cases: [
            {label: 'Several diagonals', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Left-only chain', args: [{value: 3, left: {value: 2, left: {value: 1, left: null, right: null}, right: null}, right: null}]},
            {label: 'Right-only chain', args: [{value: 1, left: null, right: {value: 2, left: null, right: {value: 3, left: null, right: null}}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 15, left: {value: 89, left: null, right: {value: 76, left: {value: 88, left: {value: 20, left: null, right: null}, right: {value: 71, left: null, right: null}}, right: {value: 13, left: null, right: null}}}, right: {value: 34, left: null, right: {value: 47, left: {value: 56, left: {value: 96, left: {value: 70, left: null, right: {value: 56, left: null, right: null}}, right: {value: 69, left: {value: 21, left: null, right: null}, right: {value: 23, left: null, right: null}}}, right: {value: 12, left: {value: 61, left: null, right: null}, right: null}}, right: {value: 61, left: {value: 45, left: null, right: {value: 59, left: null, right: {value: 88, left: null, right: {value: 9, left: null, right: {value: 42, left: null, right: null}}}}}, right: {value: 73, left: null, right: null}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'left-side-view',
        group: 'Binary traversal',
        level: 2,
        title: 'Left-side view',
        fn: 'binary_tree_list_left_view',
        params: ['root'],
        signature: 'function binary_tree_list_left_view(root)',
        brief: 'Return the leftmost visible node on each level, from top to bottom.',
        rules: ['Use the leftmost existing node on each level. A null root returns [].'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Seen from the left, each level of the tree shows one node: the leftmost node that exists at that depth. It is not always a left child: where the left subtree is shorter, the deeper levels show nodes of the right subtree.\n\nA depth-first walk that goes left before right reaches, at each depth, the leftmost node of that depth before any other node of that depth: of two nodes at the same depth, the one further left lies in a subtree the walk enters earlier. So walk with `(node, depth)` in preorder and record a value only when `depth === out.length`, which means nothing at this depth has been recorded yet. `out` then has one value per level, from the top down.\n\nBreadth-first search works too: go level by level and keep the first node of each level.',
            example: 'The root 5 has no left child and a right child 8. visit(5, 0): `out` is empty and the depth is 0, so 5 is recorded. Its left is `null`. visit(8, 1): `out.length` is 1, equal to the depth, so 8 is recorded, though it is a right child, because nothing else is at depth 1. The result is [5, 8].',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Following only left children stops where the left side ends: “Only a right subtree remains” wants [1, 2, 4], where 4 comes from the right subtree.',
                'Recording a value at every visit to a depth, instead of only the first, keeps the last node of the level, which in a left-first walk is the right-side view.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
        ],
        hints: ['Record only the first visit to each depth in left-first traversal.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_list_left_view(root)
{
    const out = [];
    visit(root, 0);
    return out;
    function visit(current, depth) {
        if (current === null) {
            return;
        }
        if (depth === out.length) {
            out.push(current.value);
        }
        visit(current.left, depth + 1);
        visit(current.right, depth + 1);
    }
}`,
        solution_php: `<?php

function binary_tree_list_left_view($root)
{
    $out = [];
    binary_tree_list_left_view_visit($root, 0, $out);
    return $out;
}

function binary_tree_list_left_view_visit($current, $depth, &$out)
{
    if ($current === null) {
        return;
    }
    if ($depth === count($out)) {
        $out[] = $current->value;
    }
    binary_tree_list_left_view_visit($current->left, $depth + 1, $out);
    binary_tree_list_left_view_visit($current->right, $depth + 1, $out);
}`,
        cases: [
            {label: 'Search tree with gaps', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Only a right subtree remains', args: [{value: 1, left: {value: 2, left: null, right: null}, right: {value: 3, left: {value: 4, left: null, right: null}, right: null}}]},
            {label: 'One node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 67, left: null, right: {value: 5, left: {value: 17, left: {value: 54, left: null, right: null}, right: {value: 79, left: {value: 99, left: {value: 50, left: null, right: null}, right: {value: 85, left: null, right: {value: 14, left: {value: 29, left: null, right: {value: 75, left: null, right: null}}, right: {value: 4, left: {value: 82, left: null, right: {value: 45, left: {value: 61, left: null, right: null}, right: {value: 40, left: null, right: null}}}, right: {value: 0, left: null, right: null}}}}}, right: {value: 89, left: {value: 51, left: null, right: null}, right: null}}}, right: {value: 9, left: {value: 62, left: {value: 46, left: null, right: null}, right: {value: 88, left: null, right: null}}, right: {value: 72, left: {value: 43, left: null, right: null}, right: null}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'right-side-view',
        group: 'Binary traversal',
        level: 2,
        title: 'Right-side view',
        fn: 'binary_tree_list_right_view',
        params: ['root'],
        signature: 'function binary_tree_list_right_view(root)',
        brief: 'Return the rightmost visible node on each level, from top to bottom.',
        rules: ['Use the rightmost existing node on each level. A null root returns [].'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Seen from the right, each level shows the rightmost node that exists at that depth. Where the right subtree is shorter than the left one, the deeper levels show nodes of the left subtree, so following right children alone is not enough.\n\nA depth-first walk that goes right before left (node, right, left) reaches the rightmost node of each depth before any other node of that depth, by the mirror of the left-view argument. Walk with `(node, depth)` and record a value when `depth === out.length`, that is, at the first node seen at this depth.\n\nWith BFS instead, the answer is the last node taken from the queue on each level.',
            example: 'The root 5 has no left child and a right child 8. visit(5, 0) records 5. Its right child comes first: visit(8, 1) finds `out.length` 1, equal to the depth, and records 8. Then 5’s left, `null`. The result is [5, 8], the same as the left view, since each level has one node. “Only a left subtree remains” shows the difference: [1, 3, 4], where 4 comes from the left subtree.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the calls on the stack.',
            pitfalls: [
                'Following only right children misses the deeper levels of the left subtree: “Only a left subtree remains” wants 4 at depth 2.',
                'Going left before right with the first-visit rule gives the left-side view.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Reverse_pre-order,_NRL'},
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
        ],
        hints: ['Record only the first visit to each depth in right-first traversal.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_list_right_view(root)
{
    const out = [];
    visit(root, 0);
    return out;
    function visit(current, depth) {
        if (current === null) {
            return;
        }
        if (depth === out.length) {
            out.push(current.value);
        }
        visit(current.right, depth + 1);
        visit(current.left, depth + 1);
    }
}`,
        solution_php: `<?php

function binary_tree_list_right_view($root)
{
    $out = [];
    binary_tree_list_right_view_visit($root, 0, $out);
    return $out;
}

function binary_tree_list_right_view_visit($current, $depth, &$out)
{
    if ($current === null) {
        return;
    }
    if ($depth === count($out)) {
        $out[] = $current->value;
    }
    binary_tree_list_right_view_visit($current->right, $depth + 1, $out);
    binary_tree_list_right_view_visit($current->left, $depth + 1, $out);
}`,
        cases: [
            {label: 'Search tree with gaps', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Only a left subtree remains', args: [{value: 1, left: {value: 2, left: null, right: {value: 4, left: null, right: null}}, right: {value: 3, left: null, right: null}}]},
            {label: 'One node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 98, left: {value: 26, left: {value: 95, left: null, right: {value: 78, left: null, right: null}}, right: {value: 81, left: {value: 41, left: {value: 23, left: {value: 70, left: null, right: null}, right: null}, right: null}, right: {value: 44, left: null, right: null}}}, right: {value: 9, left: {value: 63, left: {value: 20, left: null, right: {value: 24, left: null, right: {value: 89, left: null, right: null}}}, right: {value: 59, left: null, right: null}}, right: {value: 54, left: {value: 52, left: {value: 99, left: {value: 3, left: null, right: {value: 98, left: {value: 78, left: null, right: null}, right: {value: 27, left: null, right: null}}}, right: null}, right: {value: 21, left: null, right: null}}, right: {value: 10, left: null, right: {value: 1, left: null, right: null}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'binary-zigzag-level-order',
        group: 'Binary traversal',
        level: 2,
        title: 'Binary zigzag level order',
        fn: 'binary_tree_traverse_zigzag',
        params: ['root'],
        signature: 'function binary_tree_traverse_zigzag(root)',
        brief: 'Return one array per level, alternating direction from left to right at the root.',
        rules: ['Skip absent children. Alternate once per completed level, even when a level contains just one node.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Zigzag order is level order in which every other level is read backwards: level 0 left to right, level 1 right to left, level 2 left to right again. The levels are the same as in breadth-first search; only the direction they are read in changes.\n\nSo keep the two jobs apart. First collect the levels with an ordinary BFS: a queue of `{node, depth}`, children added left first, each value appended to `levels[depth]`. Then reverse the arrays at odd depths. The queue has to stay in left-to-right order: reversing the order in which children enter the queue does not reverse the next level but scrambles it.\n\nThe direction alternates by depth, once per level, also when a level has a single node.',
            example: 'The root 5 has no left child and a right child 8. BFS takes {5, 0}: `levels[0]` is [5], and {8, 1} is added. It takes {8, 1}: `levels[1]` is [8]. Reversing the odd level 1 leaves [8] as it is, a single value. The result is [[5], [8]]. On “Balanced and sparse levels” BFS gives [8], [3, 10], [1, 6, 14], [4, 7, 13], and reversing levels 1 and 3 gives [[8], [10, 3], [1, 6, 14], [13, 7, 4]].',
            cost: 'Time O(n): BFS once, and each value is moved at most once more by a reverse. Memory O(n) for the queue and the levels.',
            pitfalls: [
                'Reversing the even levels instead starts the wrong way: the root’s level reads left to right.',
                'Changing the order in which children enter the queue, instead of reversing finished levels, scrambles them: on “Balanced and sparse levels” level 2 comes out [6, 1, 14], neither [1, 6, 14] nor its reverse.',
                'Returning one flat array, as level order does, loses the levels: the result is one array per level.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search'},
        ],
        hints: ['Collect nearby nodes first and flip the values only after grouping by depth.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_zigzag(root)
{
    if (root === null) {
        return [];
    }
    let i = 0;

    const levels = [];
    const queue = [{node: root, depth: 0}];
    while (i < queue.length) {
        const {node: current, depth} = queue[i++];
        levels[depth] ??= [];
        levels[depth].push(current.value);
        if (current.left !== null) {
            queue.push({node: current.left, depth: depth + 1});
        }
        if (current.right !== null) {
            queue.push({node: current.right, depth: depth + 1});
        }
    }
    for (let i = 1, end = levels.length; i < end; i += 2) {
        levels[i].reverse();
    }
    return levels;
}`,
        solution_php: `<?php

function binary_tree_traverse_zigzag($root)
{
    if ($root === null) {
        return [];
    }
    $i = 0;
    $levels = [];
    $queue = [[$root, 0]];
    while ($i < count($queue)) {
        [$current, $depth] = $queue[$i++];
        $levels[$depth][] = $current->value;
        if ($current->left !== null) {
            $queue[] = [$current->left, $depth + 1];
        }
        if ($current->right !== null) {
            $queue[] = [$current->right, $depth + 1];
        }
    }
    for ($i = 1, $end = count($levels); $i < $end; $i += 2) {
        $levels[$i] = array_reverse($levels[$i]);
    }
    return $levels;
}`,
        cases: [
            {label: 'Balanced and sparse levels', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Chain with changing direction', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Single level', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 29, left: {value: 42, left: {value: 70, left: {value: 66, left: {value: 52, left: {value: 95, left: {value: 38, left: null, right: null}, right: {value: 85, left: null, right: {value: 70, left: null, right: null}}}, right: null}, right: null}, right: {value: 36, left: {value: 81, left: {value: 38, left: null, right: null}, right: null}, right: null}}, right: {value: 3, left: {value: 10, left: {value: 55, left: {value: 23, left: null, right: null}, right: null}, right: {value: 68, left: {value: 26, left: null, right: null}, right: {value: 13, left: null, right: {value: 18, left: null, right: null}}}}, right: null}}, right: {value: 87, left: {value: 70, left: null, right: {value: 42, left: null, right: {value: 74, left: null, right: {value: 3, left: null, right: null}}}}, right: null}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'top-view-by-column',
        group: 'Binary traversal',
        level: 2,
        title: 'Top view by column',
        fn: 'binary_tree_list_top_view',
        params: ['root'],
        signature: 'function binary_tree_list_top_view(root)',
        brief: 'Return the shallowest node in each vertical column, from left to right.',
        rules: ['Left subtracts one and right adds one to the column number. For nodes tied at a depth, take the first in left-to-right breadth-first order.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Seen from above, each column shows its highest node, and everything below it in that column is hidden. Columns are numbered as in vertical order: the root is 0, a left child its parent’s column minus 1, a right child plus 1. The result has one value per column, from the leftmost column to the rightmost.\n\nBreadth-first search reaches nodes by depth, and left to right within a depth, so the first node it reaches in a column is the highest one, and of two at the same height the left one, as the rules ask. Run BFS on `{node, column}` and store a value for a column only when the Map has nothing for it yet.\n\nAt the end, sort the column numbers, which can be negative, numerically and read the values out in that order.',
            example: 'The root 5 has no left child and a right child 8. BFS takes {5, 0}: column 0 is new, so it stores 5, and 5’s children go in, `null` at column -1 and 8 at column 1. The `null` is skipped. {8, 1}: column 1 is new, so it stores 8. The columns 0 and 1 in order give [5, 8]. In “A deeper node can extend past the root”, the node 0, three levels down, is the only node in column -1, so it shows: [0, 9, 4].',
            cost: 'Time O(n + c log c), c the number of columns: BFS visits each node once, and only the keys are sorted. Memory O(n) for the queue.',
            pitfalls: [
                'A depth-first walk that keeps the first value per column can reach a deep node of the left subtree before a shallow node of the right subtree in the same column, and show the wrong one.',
                'Walking only the leftmost and rightmost chains from the root misses columns reached by a zigzag lower down: in “A deeper node can extend past the root” column -1 is reached by right, left, left.',
                'Overwriting a column at every visit gives the bottom view instead.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'},
        ],
        hints: ['Remember the first value you see in each column.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_list_top_view(root)
{
    let i = 0;

    const value_by_column = new Map();
    const queue = [{node: root, column: 0}];
    while (i < queue.length) {
        const {node: current, column} = queue[i++];
        if (current === null) {
            continue;
        }
        if (!value_by_column.has(column)) {
            value_by_column.set(column, current.value);
        }
        queue.push({node: current.left, column: column - 1});
        queue.push({node: current.right, column: column + 1});
    }
    const columns = [...value_by_column.keys()].sort((a, b) => a - b);
    return columns.map(v => value_by_column.get(v));
}`,
        solution_php: `<?php

function binary_tree_list_top_view($root)
{
    $i = 0;
    $value_by_column = [];
    $queue = [[$root, 0]];
    while ($i < count($queue)) {
        [$current, $column] = $queue[$i++];
        if ($current === null) {
            continue;
        }
        if (!array_key_exists($column, $value_by_column)) {
            $value_by_column[$column] = $current->value;
        }
        $queue[] = [$current->left, $column - 1];
        $queue[] = [$current->right, $column + 1];
    }
    ksort($value_by_column);
    return array_values($value_by_column);
}`,
        cases: [
            {label: 'Shallower keys hide descendants', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'A deeper node can extend past the root', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Single node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 12, left: {value: 50, left: {value: 31, left: {value: 8, left: {value: 78, left: null, right: null}, right: null}, right: {value: 85, left: null, right: {value: 23, left: {value: 46, left: null, right: null}, right: {value: 33, left: null, right: null}}}}, right: null}, right: {value: 10, left: null, right: {value: 54, left: {value: 11, left: null, right: {value: 88, left: null, right: null}}, right: {value: 13, left: {value: 89, left: null, right: {value: 29, left: null, right: {value: 83, left: {value: 95, left: null, right: null}, right: {value: 4, left: null, right: null}}}}, right: {value: 35, left: {value: 0, left: null, right: {value: 53, left: {value: 27, left: null, right: null}, right: null}}, right: {value: 75, left: null, right: {value: 52, left: null, right: null}}}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'bottom-view-by-column',
        group: 'Binary traversal',
        level: 2,
        title: 'Bottom view by column',
        fn: 'binary_tree_list_bottom_view',
        params: ['root'],
        signature: 'function binary_tree_list_bottom_view(root)',
        brief: 'Return the deepest node in each vertical column, from left to right.',
        rules: ['For nodes tied at the same depth, take the last in left-to-right breadth-first order.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Seen from below, each column shows its lowest node. Columns are numbered as in vertical order, and the result has one value per column from left to right. When two nodes share the lowest depth in a column, the rules pick the later one in left-to-right BFS order, the one further right.\n\nBFS reaches nodes depth by depth, and left to right inside a depth. So if every visit overwrites its column’s entry, `value_by_column.set(column, value)`, the entry left at the end is the last node BFS reached in that column: the deepest, and of the deepest the rightmost. It is the top view with “first wins” turned into “last wins”.\n\nAt the end, sort the column numbers numerically and read the values out.',
            example: 'The root 5 has no left child and a right child 8. BFS takes {5, 0} and sets column 0 to 5, then {8, 1} and sets column 1 to 8. No other node reaches columns 0 or 1, so the result is [5, 8], the same as the top view of this tree. In “Equal-depth nodes with different values”, 9 and 3 are both in column 0 at depth 2; BFS reaches 3 last, so column 0 shows 3: [2, 3, 4].',
            cost: 'Time O(n + c log c), c the number of columns: BFS visits each node once, and only the keys are sorted. Memory O(n) for the queue.',
            pitfalls: [
                'A depth-first walk that overwrites by visit order keeps the node it reached last, which need not be the deepest; compare depths if you walk depth-first.',
                'Keeping the first node of a tie instead of the last fails “Farther-right visit breaks a tie”: column 1 has 7 and 13 at depth 3, and 13 must win.',
            ],
        },
        sources: [
            {title: 'Breadth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Breadth-first_search'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'},
        ],
        hints: ['Let every later visit to a column replace its previous value.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_list_bottom_view(root)
{
    let i = 0;

    const value_by_column = new Map();
    const queue = [{node: root, column: 0}];
    while (i < queue.length) {
        const {node: current, column} = queue[i++];
        if (current === null) {
            continue;
        }
        value_by_column.set(column, current.value);
        queue.push({node: current.left, column: column - 1});
        queue.push({node: current.right, column: column + 1});
    }
    const columns = [...value_by_column.keys()].sort((a, b) => a - b);
    return columns.map(v => value_by_column.get(v));
}`,
        solution_php: `<?php

function binary_tree_list_bottom_view($root)
{
    $i = 0;
    $value_by_column = [];
    $queue = [[$root, 0]];
    while ($i < count($queue)) {
        [$current, $column] = $queue[$i++];
        if ($current === null) {
            continue;
        }
        $value_by_column[$column] = $current->value;
        $queue[] = [$current->left, $column - 1];
        $queue[] = [$current->right, $column + 1];
    }
    ksort($value_by_column);
    return array_values($value_by_column);
}`,
        cases: [
            {label: 'Farther-right visit breaks a tie', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Right-only start', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Equal-depth nodes with different values', args: [{value: 1, left: {value: 2, left: null, right: {value: 9, left: null, right: null}}, right: {value: 4, left: {value: 3, left: null, right: null}, right: null}}]},
            {label: 'Single node', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 26, left: {value: 71, left: {value: 45, left: null, right: {value: 99, left: {value: 10, left: null, right: null}, right: null}}, right: {value: 49, left: null, right: null}}, right: {value: 65, left: {value: 6, left: {value: 14, left: {value: 96, left: null, right: {value: 64, left: {value: 79, left: null, right: null}, right: null}}, right: null}, right: {value: 27, left: {value: 7, left: null, right: {value: 75, left: null, right: null}}, right: {value: 63, left: null, right: {value: 86, left: null, right: null}}}}, right: {value: 63, left: {value: 5, left: {value: 10, left: null, right: null}, right: {value: 46, left: null, right: null}}, right: {value: 18, left: {value: 43, left: null, right: null}, right: {value: 62, left: {value: 37, left: null, right: null}, right: null}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'morris-inorder-traversal',
        group: 'Binary traversal',
        level: 3,
        title: 'Morris inorder traversal',
        fn: 'binary_tree_traverse_morris',
        params: ['root'],
        signature: 'function binary_tree_traverse_morris(root)',
        brief: 'Return inorder values using constant extra traversal space.',
        rules: ['The result array is excluded from the space limit. Temporarily thread right pointers and restore every pointer before returning.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'Inorder has to come back to a node after its left subtree is done. Recursion and the stack version remember the way back on a stack, O(h) memory. Morris traversal stores it in the tree itself. The node visited just before `current` in inorder, its inorder predecessor, is the rightmost node of `current`’s left subtree, and that node’s `right` is `null`; pointing it back at `current` makes a path home, a thread.\n\nThere is one pointer, `current`. If it has no left child, emit it and go right. Otherwise find the predecessor: step to the left child, then go right while `right` is neither `null` nor `current`. If the predecessor’s `right` is `null`, this is the first visit: set the thread, `predecessor.right = current`, and go left. If it points to `current`, the left subtree is done and the walk has just come back along the thread: remove it, `predecessor.right = null`, emit `current`, and go right.\n\nEach thread is set once and removed once, so when the loop ends the tree is exactly as it was, which the rules require. The extra memory is a few variables, O(1), not counting the output.',
            example: 'The root 5 has no left child and a right child 8. `current` is 5, with no left child: emit 5 and go right to 8. 8 has no left child either: emit 8 and go right, to `null`, which ends the loop. The result is [5, 8], and no thread was made, since no node has a left subtree. With 2 and children 1 and 3 the threads show: at 2 the predecessor is 1, whose `right` is `null`, so set 1.right = 2 and go to 1; 1 has no left child, so emit 1 and follow the thread back to 2; now the predecessor’s `right` is 2, so remove the thread, emit 2, go to 3 and emit it. The result is [1, 2, 3], with 1.right `null` again.',
            cost: 'Time O(n): each predecessor search walks down the right edge of a left subtree twice in all, once to set the thread and once to remove it, and those edges add up to less than n. Memory O(1) besides the output.',
            pitfalls: [
                'Stopping the predecessor search only at `null` loops forever once a thread is set: it must also stop at `current`.',
                'Not removing a thread changes the input, which the rules forbid, and the next walk over the tree goes round in a loop.',
                'Emitting `current` when the thread is set, before going left, gives preorder instead of inorder.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Morris_in-order_traversal_using_threading'},
            {title: 'Threaded binary tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Threaded_binary_tree'},
        ],
        hints: ['The inorder predecessor of a node lives at the rightmost end of its left subtree.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_morris(root)
{
    let current = root;

    const out = [];
    while (current !== null) {
        if (current.left === null) {
            out.push(current.value);
            current = current.right;
            continue;
        }
        let predecessor = current.left;
        while ((predecessor.right !== null) && (predecessor.right !== current)) {
            predecessor = predecessor.right;
        }
        if (predecessor.right === null) {
            predecessor.right = current;
            current = current.left;
        }
        else {
            predecessor.right = null;
            out.push(current.value);
            current = current.right;
        }
    }
    return out;
}`,
        solution_php: `<?php

function binary_tree_traverse_morris($root)
{
    $current = $root;
    $out = [];
    while ($current !== null) {
        if ($current->left === null) {
            $out[] = $current->value;
            $current = $current->right;
            continue;
        }
        $predecessor = $current->left;
        while (($predecessor->right !== null) && ($predecessor->right !== $current)) {
            $predecessor = $predecessor->right;
        }
        if ($predecessor->right === null) {
            $predecessor->right = $current;
            $current = $current->left;
        }
        else {
            $predecessor->right = null;
            $out[] = $current->value;
            $current = $current->right;
        }
    }
    return $out;
}`,
        cases: [
            {label: 'Several threads must be removed', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Threading an uneven tree', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'No left subtree to thread', args: [{value: 1, left: null, right: {value: 2, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 58, left: {value: 66, left: {value: 26, left: {value: 89, left: null, right: null}, right: null}, right: {value: 96, left: null, right: {value: 53, left: {value: 68, left: null, right: {value: 24, left: null, right: null}}, right: {value: 94, left: null, right: null}}}}, right: {value: 55, left: {value: 78, left: {value: 80, left: {value: 78, left: {value: 84, left: null, right: null}, right: null}, right: null}, right: {value: 35, left: null, right: {value: 13, left: {value: 47, left: null, right: null}, right: {value: 75, left: null, right: null}}}}, right: {value: 3, left: {value: 53, left: {value: 1, left: null, right: null}, right: {value: 86, left: null, right: null}}, right: {value: 95, left: null, right: {value: 84, left: {value: 33, left: null, right: null}, right: null}}}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'traverse-the-outer-boundary',
        group: 'Binary traversal',
        level: 3,
        title: 'Traverse the outer boundary',
        fn: 'binary_tree_traverse_boundary',
        params: ['root'],
        signature: 'function binary_tree_traverse_boundary(root)',
        brief: 'Return the counterclockwise boundary starting at the root.',
        rules: ['After the root, list the left boundary without leaves, all leaves left to right, then the right boundary without leaves from bottom to top. A missing side has no boundary. List each node once.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'The boundary, read counterclockwise from the root, has three parts after the root: the left edge going down, the leaves from left to right along the bottom, and the right edge coming back up. The two edges leave out their leaves, since the bottom part lists every leaf, and that is how each node is listed once.\n\nThe left edge starts at `root.left` and at each node steps to the left child, or to the right child when there is no left child, and stops at a leaf: it is the outermost path on that side. The right edge is the same with the sides swapped, from `root.right`, collected top-down and then reversed to read bottom-up. If the root has no left child there is no left edge at all, and the same on the right.\n\nThe leaves come from a plain depth-first walk, left before right, of `root.left` and `root.right`, pushing a node when it has no children. The walk starts below the root, so a root with no children is listed once, as the root, and not again as a leaf.',
            example: 'The root 5 has no left child and a right child 8. The output starts as [5]. The left edge starts at 5’s left, `null`, and is empty. The right edge starts at 8, but 8 is a leaf, so it is empty too. The leaves below 5 are [8]. So the result is [5, 8]. On the 8, 3, 10 tree of the first test the parts are [8], the left edge [3], the leaves [1, 4, 7, 13], and the right edge [10, 14] reversed to [14, 10]: [8, 3, 1, 4, 7, 13, 14, 10].',
            cost: 'Time O(n): the leaf walk visits each node once, and each edge is at most h long. Memory O(h) for the walk and the two edges.',
            pitfalls: [
                'Keeping the leaf at the end of an edge lists it twice, once on the edge and once among the leaves.',
                'Stopping an edge where its outer child is missing cuts it short: in “Right-only root”, 6 is on the right edge, reached by a step to a left child.',
                'Adding the right edge top-down breaks the counterclockwise order: on the first test the end must be 14, 10, not 10, 14.',
            ],
        },
        sources: [
            {title: 'Binary tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Binary_tree'},
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search'},
        ],
        hints: ['Collect the left boundary, leaves, and right boundary separately.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function binary_tree_traverse_boundary(root)
{
    if (root === null) {
        return [];
    }
    const out = [root.value];
    const left = boundary(root.left, 'left', 'right');
    const right = boundary(root.right, 'right', 'left');
    out.push(...left);
    leaves(root.left);
    leaves(root.right);
    out.push(...right.reverse());
    return out;
    function boundary(current, first, second) {
        const out = [];
        while ((current !== null) && !is_leaf(current)) {
            out.push(current.value);
            current = current[first] ?? current[second];
        }
        return out;
    }
    function leaves(current) {
        if (current === null) {
            return;
        }
        if (is_leaf(current)) {
            out.push(current.value);
            return;
        }
        leaves(current.left);
        leaves(current.right);
    }
    function is_leaf(current) {
        return (current.left === null) && (current.right === null);
    }
}`,
        solution_php: `<?php

function binary_tree_traverse_boundary($root)
{
    if ($root === null) {
        return [];
    }
    $out = [$root->value];
    $left = binary_tree_traverse_boundary_side($root->left, 'left', 'right');
    $right = binary_tree_traverse_boundary_side($root->right, 'right', 'left');
    array_push($out, ...$left);
    binary_tree_traverse_boundary_leaves($root->left, $out);
    binary_tree_traverse_boundary_leaves($root->right, $out);
    array_push($out, ...array_reverse($right));
    return $out;
}

function binary_tree_traverse_boundary_side($current, $first, $second)
{
    $out = [];
    while (($current !== null) && !binary_tree_traverse_boundary_is_leaf($current)) {
        $out[] = $current->value;
        $current = $current->$first ?? $current->$second;
    }
    return $out;
}

function binary_tree_traverse_boundary_leaves($current, &$out)
{
    if ($current === null) {
        return;
    }
    if (binary_tree_traverse_boundary_is_leaf($current)) {
        $out[] = $current->value;
        return;
    }
    binary_tree_traverse_boundary_leaves($current->left, $out);
    binary_tree_traverse_boundary_leaves($current->right, $out);
}

function binary_tree_traverse_boundary_is_leaf($current)
{
    return ($current->left === null) && ($current->right === null);
}`,
        cases: [
            {label: 'Left boundary, leaves, then reversed right boundary', args: [{value: 8, left: {value: 3, left: {value: 1, left: null, right: null}, right: {value: 6, left: {value: 4, left: null, right: null}, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: {value: 14, left: {value: 13, left: null, right: null}, right: null}}}]},
            {label: 'Right-only root', args: [{value: 9, left: null, right: {value: 4, left: {value: 6, left: {value: 0, left: null, right: null}, right: null}, right: null}}]},
            {label: 'Left-only chain', args: [{value: 3, left: {value: 2, left: {value: 1, left: null, right: null}, right: null}, right: null}]},
            {label: 'A leaf appears once', args: [{value: 0, left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
            {label: 'Twenty-five nodes, generated', args: [{value: 86, left: {value: 24, left: {value: 96, left: null, right: {value: 49, left: null, right: {value: 64, left: null, right: null}}}, right: null}, right: {value: 25, left: null, right: {value: 37, left: {value: 2, left: {value: 40, left: {value: 41, left: null, right: null}, right: {value: 77, left: {value: 55, left: null, right: null}, right: null}}, right: {value: 4, left: {value: 67, left: {value: 51, left: null, right: {value: 94, left: null, right: null}}, right: {value: 51, left: {value: 78, left: null, right: null}, right: null}}, right: {value: 13, left: {value: 42, left: null, right: {value: 75, left: null, right: {value: 99, left: null, right: null}}}, right: {value: 10, left: {value: 62, left: null, right: null}, right: {value: 9, left: null, right: null}}}}}, right: null}}}]},
            {label: 'Leaning left, twenty deep', args: [{value: 0, left: {value: 1, left: {value: 2, left: {value: 3, left: {value: 4, left: {value: 5, left: {value: 6, left: {value: 7, left: {value: 8, left: {value: 9, left: {value: 10, left: {value: 11, left: {value: 12, left: {value: 13, left: {value: 14, left: {value: 15, left: {value: 16, left: {value: 17, left: {value: 18, left: {value: 19, left: null, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}, right: null}]},
        ],
    },
    {
        uid: 'list-all-file-paths',
        group: 'File systems',
        level: 1,
        title: 'List all file paths',
        fn: 'fs_list_file_paths',
        params: ['root'],
        signature: 'function fs_list_file_paths(root)',
        brief: 'Return the absolute paths of every file in depth-first order.',
        rules: ['Paths start at / and omit the root directory’s name. Preserve child order. An empty tree returns [].'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {
            approach: 'The file system is a tree: a directory is a node whose `children` are files and smaller directories, and a file is a leaf. Listing every file in depth-first order is a preorder walk: enter an entry and, if it is a directory, walk its `children` one by one, in their order, each to the bottom before the next.\n\nThe path of an entry is its parent’s path, a `/`, and its own `name`. So pass the path down as an argument: the root gets the empty prefix `\'\'`, because its own `name` is not part of any path, and each child gets `path + \'/\' + child.name`. A file has no children; it is where a path is complete, and the one place a path goes into the output. Directories, empty ones included, only pass the path on.\n\nThe empty tree, a `null` root, has no files and gives `[]`.',
            example: 'The walk starts at the root `work` with the prefix `\'\'`. Its first child `src` is a directory, so it gets the path `/src` and is entered: its one child `index.js` is a file at `/src/index.js`, the first path out. Back at the root, the next child `readme.md` is a file at `/readme.md`. The result is `[\'/src/index.js\', \'/readme.md\']`.',
            cost: 'Time O(n) visits, plus building each path string, which is as long as the path: on a deep chain of folders that adds up to O(n × h) characters. Memory O(h) for the recursion, h the depth of the deepest folder, plus the output.',
            pitfalls: [
                'Starting the root at `/` and adding `\'/\' + name` gives `//src/index.js`; starting with the root’s `name` gives `/work/src/index.js`. The root adds nothing to a path.',
                'Pushing a path for every entry lists the directories too, and an empty folder such as `/parent/leaf` shows up though it holds no file.',
                'Reading `root.children` before checking for `null` throws on the empty tree.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Path (computing), Wikipedia', url: 'https://en.wikipedia.org/wiki/Path_(computing)'},
        ],
        hints: ['Carry the current path through each recursive call.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_list_file_paths(root)
{
    const out = [];
    if (root !== null) {
        visit(root, '');
    }
    return out;
    function visit(entry, path) {
        if (entry.type === 'file') {
            out.push(path);
            return;
        }
        for (const child of entry.children) {
            visit(child, \`\${path}/\${child.name}\`);
        }
    }
}`,
        solution_php: `<?php

function fs_list_file_paths($root)
{
    $out = [];
    if ($root !== null) {
        fs_list_file_paths_visit($root, '', $out);
    }
    return $out;
}

function fs_list_file_paths_visit($entry, $path, &$out)
{
    if ($entry->type === 'file') {
        $out[] = $path;
        return;
    }
    foreach ($entry->children as $child) {
        fs_list_file_paths_visit($child, "{$path}/{$child->name}", $out);
    }
}`,
        cases: [
            {label: 'Same filename in two folders', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}]},
            {label: 'Empty folders contribute nothing', args: [{name: 'work', type: 'directory', children: [{name: 'parent', type: 'directory', children: [{name: 'leaf', type: 'directory', children: []}]}]}]},
            {label: 'Space in a filename', args: [{name: 'work', type: 'directory', children: [{name: 'two words.txt', type: 'file', size: 0}]}]},
            {label: 'Empty root', args: [null]},
        ],
    },
    {
        uid: 'sum-all-file-sizes',
        group: 'File systems',
        level: 1,
        title: 'Sum all file sizes',
        fn: 'fs_sum_file_sizes',
        params: ['root'],
        signature: 'function fs_sum_file_sizes(root)',
        brief: 'Return the combined size of all files under the root, in bytes.',
        rules: ['Directories contribute the sums of their contents. Zero-byte files are valid. A null root returns 0.'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {
            approach: 'Only files have a size here; a directory has none of its own. So the total of a directory is the sum of the totals of its `children`, and the total of a file is its `size`. That is a recursive definition with two base cases, a file and the empty tree, and the code follows it line for line.\n\nThe function calls itself on each child and adds up what comes back: a postorder walk, since a directory’s total is known only after all its children are done. A file returns its `size` at once, an empty directory adds nothing and returns 0, and a `null` root returns 0.',
            example: 'fs_sum_file_sizes(work) asks its two children. `src` is a directory with one child, the file `index.js`, which returns 12, so `src` returns 12. `readme.md` is a file and returns 4. The root adds them up: 12 + 4 = 16.',
            cost: 'Time O(n): each entry is visited once. Memory O(h) for the recursion, h the depth of the deepest folder.',
            pitfalls: [
                'Telling a file from a directory with `if (entry.size)` takes a zero-byte file for a directory and then reads its missing `children`; test `entry.type === \'file\'` instead.',
                'Adding `entry.size` for a directory adds `undefined` and turns the total into `NaN`.',
                'Forgetting the `null` root throws on the empty tree, where the answer is 0.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Post-order,_LRN'},
            {title: 'du (Unix), Wikipedia', url: 'https://en.wikipedia.org/wiki/Du_(Unix)'},
        ],
        hints: ['Give a file and a directory different base cases.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_sum_file_sizes(root)
{
    if (root === null) {
        return 0;
    }
    if (root.type === 'file') {
        return root.size;
    }
    let out = 0;
    for (const child of root.children) {
        out += fs_sum_file_sizes(child);
    }
    return out;
}`,
        solution_php: `<?php

function fs_sum_file_sizes($root)
{
    if ($root === null) {
        return 0;
    }
    if ($root->type === 'file') {
        return $root->size;
    }
    $out = 0;
    foreach ($root->children as $child) {
        $out += fs_sum_file_sizes($child);
    }
    return $out;
}`,
        cases: [
            {label: 'Project files', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}]},
            {label: 'Nested empty folders', args: [{name: 'work', type: 'directory', children: [{name: 'parent', type: 'directory', children: [{name: 'leaf', type: 'directory', children: []}]}]}]},
            {label: 'Zero-byte and positive files', args: [{name: 'work', type: 'directory', children: [{name: 'zero', type: 'file', size: 0}, {name: 'positive', type: 'file', size: 9}]}]},
            {label: 'Empty root', args: [null]},
        ],
    },
    {
        uid: 'list-empty-directories',
        group: 'File systems',
        level: 1,
        title: 'List empty directories',
        fn: 'fs_list_empty_directories',
        params: ['root'],
        signature: 'function fs_list_empty_directories(root)',
        brief: 'Return the paths of directories with no children, in depth-first order.',
        rules: ['Use / for an empty root directory. A folder containing an empty subfolder is still nonempty. A null root returns [].'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {
            approach: 'A directory is empty when its own `children` array is empty: `children.length === 0`. It is a local test, made on one node at a time. It does not ask whether there are files somewhere below: a folder that holds only an empty subfolder has a child, so it is not empty, and a zero-byte file is a child too.\n\nWalk the tree in preorder and carry the path down, as when listing file paths: the root starts with `\'\'`, and each child gets `path + \'/\' + child.name`. At a directory, test it first and push its path if it is empty, then walk its children; files are skipped. The root’s path is `\'\'`, so when the root is the empty one, the path to report is `/`.',
            example: 'The root `work` has two children, so it is not empty. Its child `src` has one child, `index.js`, so it is not empty either. `index.js` and `readme.md` are files and are skipped. No directory is empty, and the result is `[]`; with an empty folder `empty` next to `src`, the result would be `[\'/empty\']`.',
            cost: 'Time O(n): each entry is visited once, plus building the path strings, up to O(n × h) characters on a deep chain. Memory O(h) for the recursion.',
            pitfalls: [
                'Calling a folder empty when it has no files below it lists `/parent` as well as `/parent/leaf`; only the folder’s own `children` count.',
                'Reading `children.length` on a file throws, since a file has no `children`; check `type === \'directory\'` first.',
                'An empty root comes out as `\'\'` unless it is turned into `/`.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'find(1), Linux manual page, man7.org', url: 'https://man7.org/linux/man-pages/man1/find.1.html'},
        ],
        hints: ['Only test the length of children on a directory.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_list_empty_directories(root)
{
    const out = [];
    if (root !== null) {
        visit(root, '');
    }
    return out;
    function visit(entry, path) {
        if (entry.type !== 'directory') {
            return;
        }
        if (entry.children.length === 0) {
            out.push(path || '/');
        }
        for (const child of entry.children) {
            visit(child, \`\${path}/\${child.name}\`);
        }
    }
}`,
        solution_php: `<?php

function fs_list_empty_directories($root)
{
    $out = [];
    if ($root !== null) {
        fs_list_empty_directories_visit($root, '', $out);
    }
    return $out;
}

function fs_list_empty_directories_visit($entry, $path, &$out)
{
    if ($entry->type !== 'directory') {
        return;
    }
    if (count($entry->children) === 0) {
        $out[] = ($path === '') ? '/' : $path;
    }
    foreach ($entry->children as $child) {
        fs_list_empty_directories_visit($child, "{$path}/{$child->name}", $out);
    }
}`,
        cases: [
            {label: 'Empty subdirectory', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}]},
            {label: 'Only the deepest folder is empty', args: [{name: 'work', type: 'directory', children: [{name: 'parent', type: 'directory', children: [{name: 'leaf', type: 'directory', children: []}]}]}]},
            {label: 'An empty root directory', args: [{name: 'work', type: 'directory', children: []}]},
            {label: 'A zero-byte file takes a slot', args: [{name: 'work', type: 'directory', children: [{name: 'zero', type: 'file', size: 0}]}]},
            {label: 'Null root', args: [null]},
        ],
    },
    {
        uid: 'resolve-a-file-or-folder-path',
        group: 'File systems',
        level: 2,
        title: 'Resolve a file or folder path',
        fn: 'fs_find_entry',
        params: ['root', 'path'],
        signature: 'function fs_find_entry(root, path)',
        brief: 'Return the file or directory at an absolute path relative to the root.',
        rules: ['Use / for the root. Paths are case-sensitive. Return null for missing entries, relative paths, empty segments, . or .., or a path through a file.'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}, path: '\'/src/index.js\''}},
        explanation: {
            approach: 'An absolute path is a list of names, one per level: `/src/index.js` means the child named `src` of the root, then its child named `index.js`. So resolving it is a walk down one branch of the tree, not a search of the whole tree: split the path after its leading `/` into segments, and for each segment step into the child with exactly that `name`.\n\nEach step can fail, and every failure returns `null`: the current entry is a file, which has no children to step into; no child has the name; or the segment is empty (from `//` or a trailing `/`), `.` or `..`. A `path` that does not start with `/` is relative and fails at once. `/` alone is the root itself, and it has to be answered before splitting, because `\'/\'.slice(1).split(\'/\')` gives `[\'\']`, one empty segment.\n\nReal systems treat `//` like `/` and give `.` and `..` a meaning; this task is strict and rejects them.',
            example: 'With `path` = `/src/index.js`, the path starts with `/` and splits into `[\'src\', \'index.js\']`. The walk starts at the root `work`, a directory, and finds its child `src`. `src` is a directory too, and its child `index.js` is found. The segments are used up, so the result is that entry, `{name: \'index.js\', type: \'file\', size: 12}`. The path `/readme.md/x` would fail at `x`, since `readme.md` is a file.',
            cost: 'Time O(d × k), d the number of segments in `path` and k the most children a directory on the way has, scanned to find a name. Memory O(d) for the segments; the walk itself is a loop.',
            pitfalls: [
                'Searching the whole tree for the last name finds the first `index.js` anywhere, the one under `/src` when the path says `/docs/index.js`.',
                'Stepping into an entry without checking its `type` reads the `children` of a file: `/readme.md/x` must give `null`, not an error.',
                'Splitting `/` without handling it first leaves one empty segment and returns `null` for the root.',
            ],
        },
        sources: [
            {title: 'Path (computing), Wikipedia', url: 'https://en.wikipedia.org/wiki/Path_(computing)'},
            {title: 'Pathname Resolution, POSIX, The Open Group', url: 'https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap04.html#tag_04_16'},
        ],
        hints: ['Follow one child name per path segment.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_find_entry(root, path)
{
    if ((root === null) || !path.startsWith('/')) {
        return null;
    }
    if (path === '/') {
        return root;
    }
    let current = root;
    for (const name of path.slice(1).split('/')) {
        if ((name === '') || (name === '.') || (name === '..') || (current.type !== 'directory')) {
            return null;
        }
        current = current.children.find(v => v.name === name);
        if (!current) {
            return null;
        }
    }
    return current;
}`,
        solution_php: `<?php

function fs_find_entry($root, $path)
{
    if (($root === null) || !str_starts_with($path, '/')) {
        return null;
    }
    if ($path === '/') {
        return $root;
    }
    $current = $root;
    foreach (explode('/', substr($path, 1)) as $name) {
        if (($name === '') || ($name === '.') || ($name === '..') || ($current->type !== 'directory')) {
            return null;
        }
        $current = fs_find_entry_child($current, $name);
        if ($current === null) {
            return null;
        }
    }
    return $current;
}

function fs_find_entry_child($directory, $name)
{
    foreach ($directory->children as $child) {
        if ($child->name === $name) {
            return $child;
        }
    }
    return null;
}`,
        cases: [
            {label: 'Look in the intended folder', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/docs/index.js']},
            {label: 'Find a directory', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/empty']},
            {label: 'Find the root', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/']},
            {label: 'Path through a file', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/readme.md/x']},
            {label: 'Relative path', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, 'docs/index.js']},
            {label: 'Double slash', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '//docs']},
            {label: 'Dot segment', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/src/../docs']},
            {label: 'Missing root', args: [null, '/']},
        ],
    },
    {
        uid: 'find-the-largest-file',
        group: 'File systems',
        level: 2,
        title: 'Find the largest file',
        fn: 'fs_find_largest_file',
        params: ['root'],
        signature: 'function fs_find_largest_file(root)',
        brief: 'Return {path, size} for the largest file, or null if there are no files.',
        rules: ['Path starts with /. When several files share the largest size, choose the first in depth-first order.'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {
            approach: 'This is a running maximum over a tree walk: keep the best file seen so far, look at every file once, and replace the best when the current one is larger. When the walk ends, the best is the answer, or `null` if no file was seen.\n\nThe walk is the same preorder as when listing file paths, with the path passed down (`\'\'` for the root, `path + \'/\' + child.name` for each child), so files come in depth-first order. A tie goes to the first of the files, and that follows from the comparison: replace only when the size is strictly greater, and a later file of the same size never takes an earlier one’s place.\n\nStart with no candidate, `null`, rather than a size of 0: a tree whose only file has 0 bytes still has a largest file, `{path, size: 0}`.',
            example: 'The walk enters `src` and meets `/src/index.js`, 12 bytes. There is no best yet, so it becomes `{path: \'/src/index.js\', size: 12}`. The next file, `/readme.md`, has 4 bytes, not more than 12, so the best stays. The result is `{path: \'/src/index.js\', size: 12}`.',
            cost: 'Time O(n): each entry is visited once, plus the path strings. Memory O(h) for the recursion; only one candidate is kept.',
            pitfalls: [
                'Using `>=` lets a later file of the same size win: in the tie case `/c` replaces `/a/b`.',
                'Starting the best at size 0 and comparing with `>` never picks a zero-byte file, which can be the largest one.',
                'A tree of directories with no file at all must give `null`, not a half-filled `{path, size}`.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR'},
            {title: 'Depth-first search, Wikipedia', url: 'https://en.wikipedia.org/wiki/Depth-first_search'},
        ],
        hints: ['Replace the current best only when you find a strictly larger size.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_find_largest_file(root)
{
    let out = null;
    if (root !== null) {
        visit(root, '');
    }
    return out;
    function visit(entry, path) {
        if (entry.type === 'file') {
            if ((out === null) || (entry.size > out.size)) {
                out = {path, size: entry.size};
            }
            return;
        }
        for (const child of entry.children) {
            visit(child, \`\${path}/\${child.name}\`);
        }
    }
}`,
        solution_php: `<?php

function fs_find_largest_file($root)
{
    $out = null;
    if ($root !== null) {
        fs_find_largest_file_visit($root, '', $out);
    }
    return $out;
}

function fs_find_largest_file_visit($entry, $path, &$out)
{
    if ($entry->type === 'file') {
        if (($out === null) || ($entry->size > $out['size'])) {
            $out = ['path' => $path, 'size' => $entry->size];
        }
        return;
    }
    foreach ($entry->children as $child) {
        fs_find_largest_file_visit($child, "{$path}/{$child->name}", $out);
    }
}`,
        cases: [
            {label: 'Largest file is nested', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}]},
            {label: 'Tie goes to the earlier path', args: [{name: 'work', type: 'directory', children: [{name: 'a', type: 'directory', children: [{name: 'b', type: 'file', size: 8}]}, {name: 'c', type: 'file', size: 8}]}]},
            {label: 'A zero-byte file can win', args: [{name: 'work', type: 'directory', children: [{name: 'x', type: 'file', size: 0}]}]},
            {label: 'No files', args: [{name: 'work', type: 'directory', children: [{name: 'parent', type: 'directory', children: [{name: 'leaf', type: 'directory', children: []}]}]}]},
            {label: 'Null root', args: [null]},
        ],
    },
    {
        uid: 'find-files-by-extension',
        group: 'File systems',
        level: 2,
        title: 'Find files by extension',
        fn: 'fs_list_files_by_extension',
        params: ['root', 'extension'],
        signature: 'function fs_list_files_by_extension(root, extension)',
        brief: 'Return the paths of files whose final extension equals extension.',
        rules: ['Match case exactly. The extension follows the final dot and excludes the dot. A leading dot alone or a trailing dot does not count.'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}, extension: '\'js\''}},
        explanation: {
            approach: 'The extension of a file name is what follows its last dot: `archive.tar.gz` has `gz`. So find the last dot with `name.lastIndexOf(\'.\')`, and the extension is the text after it. Two places for that dot do not count: index 0, where the dot only marks a hidden file (`.gitignore` has no extension, though `.env.local` has `local`), and the very end, where nothing follows it (`file.`). A name with no dot has no extension: `lastIndexOf` gives `-1`.\n\nSo a file matches when its last dot is at an index `i` with `0 < i < name.length - 1` and `name.slice(i + 1) === extension`, compared exactly: `JS` is not `js`. Walk the tree in preorder with the path passed down, as when listing file paths, test only files, and push the path of each match in the order the walk meets them.',
            example: 'With `extension` = `js`, the walk enters `src` and meets `index.js`: its last dot is at index 5, neither first nor last, and the text after it is `js`, so `/src/index.js` is pushed. `readme.md` has `md` after its dot, not `js`. The result is `[\'/src/index.js\']`.',
            cost: 'Time O(n) visits plus one scan of each file name for its last dot, so linear in the total length of the names and paths. Memory O(h) for the recursion.',
            pitfalls: [
                '`name.endsWith(\'.\' + extension)` matches the dotfile `.gitignore` for `gitignore`, and `file.` for an empty `extension`; neither file has that extension.',
                '`name.split(\'.\')[1]` takes the text after the first dot, `tar` for `a.tar.gz`; the extension follows the last one.',
                'Lowercasing both sides matches `index.js` for `JS`; the rule is an exact match.',
            ],
        },
        sources: [
            {title: 'Filename extension, Wikipedia', url: 'https://en.wikipedia.org/wiki/Filename_extension'},
            {title: 'Hidden file and hidden directory, Wikipedia', url: 'https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory#Unix_and_Unix-like_environments'},
            {title: 'String.prototype.lastIndexOf(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf'},
        ],
        hints: ['Look for the position of the final dot in the filename.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_list_files_by_extension(root, extension)
{
    const out = [];
    if (root !== null) {
        visit(root, '');
    }
    return out;
    function visit(entry, path) {
        if (entry.type === 'file') {
            const i = entry.name.lastIndexOf('.');
            if ((i > 0) && (i < entry.name.length - 1) && (entry.name.slice(i + 1) === extension)) {
                out.push(path);
            }
            return;
        }
        for (const child of entry.children) {
            visit(child, \`\${path}/\${child.name}\`);
        }
    }
}`,
        solution_php: `<?php

function fs_list_files_by_extension($root, $extension)
{
    $out = [];
    if ($root !== null) {
        fs_list_files_by_extension_visit($root, '', $extension, $out);
    }
    return $out;
}

function fs_list_files_by_extension_visit($entry, $path, $extension, &$out)
{
    if ($entry->type === 'file') {
        $i = strrpos($entry->name, '.');
        $has_extension = ($i !== false) && ($i > 0) && ($i < strlen($entry->name) - 1);
        if ($has_extension && (substr($entry->name, $i + 1) === $extension)) {
            $out[] = $path;
        }
        return;
    }
    foreach ($entry->children as $child) {
        fs_list_files_by_extension_visit($child, "{$path}/{$child->name}", $extension, $out);
    }
}`,
        cases: [
            {label: 'JavaScript in two folders', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, 'js']},
            {label: 'Case-sensitive extension', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, 'JS']},
            {label: 'Last dot wins', args: [{name: 'work', type: 'directory', children: [{name: 'a.tar.gz', type: 'file', size: 0}]}, 'gz']},
            {label: 'Dotfile has no extension', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, 'gitignore']},
            {label: 'Dotfile can have a later extension', args: [{name: 'work', type: 'directory', children: [{name: '.env.local', type: 'file', size: 1}]}, 'local']},
            {label: 'Empty extension', args: [{name: 'work', type: 'directory', children: [{name: 'file.', type: 'file', size: 0}, {name: 'no-dot', type: 'file', size: 0}]}, '']},
        ],
    },
    {
        uid: 'report-every-folders-size',
        group: 'File systems',
        level: 3,
        title: 'Report every folder’s size',
        fn: 'fs_list_directory_sizes',
        params: ['root'],
        signature: 'function fs_list_directory_sizes(root)',
        brief: 'Return a {path, size} row for each directory with its recursive byte total.',
        rules: ['List directories in preorder, including / for the root. Files contribute size and have no output row. A null root returns [].'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {
            approach: 'Two walks in one. The rows come in preorder: a folder’s row before the rows of the folders inside it. Its size is a postorder value: the sum of its files and subfolders, known only after all of them are done. One recursive pass gives both, when the function writes rows and also returns totals.\n\nAt a directory, push its row `{path, size: 0}` first, which fixes its place in the output, then call the function on each child, add the totals they return into `row.size`, and return that total to the parent. A file pushes no row and just returns its `size`. The row is an object already in the output array, so filling in its `size` later changes it there. Paths are built as when listing file paths: the root has the prefix `\'\'` and the row `/`, and each child gets `path + \'/\' + child.name`.',
            example: 'At the root, the row `{path: \'/\', size: 0}` goes out first. The walk enters `src` and pushes `{path: \'/src\', size: 0}` after it; its file `index.js` returns 12, so the `/src` row becomes 12, and `src` returns 12 to the root. Next, `readme.md` returns 4. The root’s row adds 12 + 4 = 16. The result is `[{path: \'/\', size: 16}, {path: \'/src\', size: 12}]`.',
            cost: 'Time O(n): one pass, each entry visited once, plus the path strings. A separate sum for each folder would cost O(n × h), since every entry is summed again for each folder above it. Memory O(h) for the recursion, plus one row per folder.',
            pitfalls: [
                'Pushing the row after the children are done gives postorder, `/src` before `/`.',
                'An empty directory still gets a row, with size 0, and so does an empty root: `[{path: \'/\', size: 0}]`.',
                'The root’s row must say `/`, not `\'\'` or the root’s `name`.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search'},
            {title: 'du (Unix), Wikipedia', url: 'https://en.wikipedia.org/wiki/Du_(Unix)'},
        ],
        hints: ['Add the output row before visiting children and fill in the size afterward.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_list_directory_sizes(root)
{
    const out = [];
    if (root !== null) {
        visit(root, '');
    }
    return out;
    function visit(entry, path) {
        if (entry.type === 'file') {
            return entry.size;
        }
        const row = {path: path || '/', size: 0};
        out.push(row);
        for (const child of entry.children) {
            row.size += visit(child, \`\${path}/\${child.name}\`);
        }
        return row.size;
    }
}`,
        solution_php: `<?php

function fs_list_directory_sizes($root)
{
    $out = [];
    if ($root !== null) {
        fs_list_directory_sizes_visit($root, '', $out);
    }
    return $out;
}

function fs_list_directory_sizes_visit($entry, $path, &$out)
{
    if ($entry->type === 'file') {
        return $entry->size;
    }
    $row = (object) ['path' => ($path === '') ? '/' : $path, 'size' => 0];
    $out[] = $row;
    foreach ($entry->children as $child) {
        $row->size += fs_list_directory_sizes_visit($child, "{$path}/{$child->name}", $out);
    }
    return $row->size;
}`,
        cases: [
            {label: 'Folder and descendant totals', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}]},
            {label: 'Nested zero totals', args: [{name: 'work', type: 'directory', children: [{name: 'parent', type: 'directory', children: [{name: 'leaf', type: 'directory', children: []}]}]}]},
            {label: 'Empty root directory', args: [{name: 'work', type: 'directory', children: []}]},
            {label: 'No root', args: [null]},
        ],
    },
    {
        uid: 'rename-a-file-or-folder',
        group: 'File systems',
        level: 3,
        title: 'Rename a file or folder',
        fn: 'fs_rename_entry',
        params: ['root', 'path', 'name'],
        signature: 'function fs_rename_entry(root, path, name)',
        brief: 'Return a copied tree with the entry at path renamed, preserving its position and descendants.',
        rules: ['Use / for the root. Return null for unknown or noncanonical paths, invalid names, or a sibling name collision. A name cannot be empty, contain /, or equal "." or "..". Keep the input unchanged.'],
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}, path: '\'/src\'', name: '\'lib\''}},
        explanation: {
            approach: 'Renaming changes one field, the `name` of the entry at `path`; everything else stays: its place among its siblings, its `children`, its `size`. The input must stay unchanged, so the change goes into a copy, and the copy must reach down to the renamed entry: copy the whole tree (`structuredClone`), or copy only the entries on the way down to it, which is called path copying.\n\nBefore copying, check the new `name`: it cannot be empty, contain `/`, or be `.` or `..`. Then resolve `path` in the copy as in resolving a path, one exact name per segment, failing on a relative path, an empty segment, `.`, `..` or a step through a file, and keep the `children` array of the last directory: the siblings of the entry. If a sibling other than the entry itself already has the new name, the rename would put two equal names in one directory: return `null`. Otherwise set the name and return the copy.\n\n`/` is the root itself. It has no siblings, so any valid name is accepted, and renaming it changes no path, since the root’s name is not part of one.',
            example: 'With `path` = `/src` and `name` = `lib`: the name is valid, so the tree is copied. The one segment, `src`, is found among the root’s children, `src` and `readme.md`. The other sibling, `readme.md`, is not named `lib`, so the copy’s `src` becomes `lib`. The result is the root `work` with `lib`, still holding `index.js` of 12 bytes, and `readme.md` after it; the input still says `src`.',
            cost: 'Time and memory O(n) for a full copy, plus O(h × k) for the walk, k the most children a directory has. Path copying copies only the entries on the way and their `children` arrays, O(h × k), and shares the rest with the input.',
            pitfalls: [
                'A shallow copy, `{...root}`, shares the `children` arrays with the input, so a rename in it renames the input too.',
                'Checking the collision against every sibling, the entry included, rejects a rename to its own name, which is a valid no-op that returns a copy.',
                'A trailing slash, `/src/`, leaves an empty last segment and must give `null`, as must a new name such as `a/b`.',
            ],
        },
        sources: [
            {title: 'Persistent data structure, Wikipedia', url: 'https://en.wikipedia.org/wiki/Persistent_data_structure#Path_copying'},
            {title: 'structuredClone(), MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone'},
            {title: 'Filename, Wikipedia', url: 'https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words'},
        ],
        hints: ['Resolve the parent before checking for a sibling with the new name.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function fs_rename_entry(root, path, name)
{
    if ((root === null) || !path.startsWith('/') || !name || name.includes('/') || (name === '.') || (name === '..')) {
        return null;
    }
    const out = structuredClone(root);
    if (path === '/') {
        out.name = name;
        return out;
    }
    let current = out;
    let siblings = [];
    for (const segment of path.slice(1).split('/')) {
        if (!segment || (segment === '.') || (segment === '..') || (current.type !== 'directory')) {
            return null;
        }
        siblings = current.children;
        current = siblings.find(v => v.name === segment);
        if (!current) {
            return null;
        }
    }
    if (siblings.some(v => (v !== current) && (v.name === name))) {
        return null;
    }
    current.name = name;
    return out;
}`,
        solution_php: `<?php

function fs_rename_entry($root, $path, $name)
{
    $is_name_valid = ($name !== '') && !str_contains($name, '/') && ($name !== '.') && ($name !== '..');
    if (($root === null) || !str_starts_with($path, '/') || !$is_name_valid) {
        return null;
    }
    // a deep copy: new objects all the way down
    $out = json_decode(json_encode($root));
    if ($path === '/') {
        $out->name = $name;
        return $out;
    }
    $current = $out;
    $siblings = [];
    foreach (explode('/', substr($path, 1)) as $segment) {
        if (($segment === '') || ($segment === '.') || ($segment === '..') || ($current->type !== 'directory')) {
            return null;
        }
        $siblings = $current->children;
        $current = fs_rename_entry_child($current, $segment);
        if ($current === null) {
            return null;
        }
    }
    foreach ($siblings as $sibling) {
        if (($sibling !== $current) && ($sibling->name === $name)) {
            return null;
        }
    }
    $current->name = $name;
    return $out;
}

function fs_rename_entry_child($directory, $name)
{
    foreach ($directory->children as $child) {
        if ($child->name === $name) {
            return $child;
        }
    }
    return null;
}`,
        cases: [
            {label: 'Rename a nested file', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'old.js', type: 'file', size: 3}]}]}, '/src/old.js', 'new.js']},
            {label: 'Rename the root itself', args: [{name: 'old', type: 'directory', children: [{name: 'a', type: 'file', size: 2}]}, '/', 'new']},
            {label: 'Same name is a valid no-op', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/src', 'src']},
            {label: 'Directory name collision', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/src', 'docs']},
            {label: 'Invalid separators', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/src', 'a/b']},
            {label: 'Invalid current path', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/src/', 'code']},
            {label: 'Missing entry', args: [{name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}, {name: 'test.js', type: 'file', size: 8}]}, {name: 'docs', type: 'directory', children: [{name: 'index.js', type: 'file', size: 5}]}, {name: 'empty', type: 'directory', children: []}, {name: '.gitignore', type: 'file', size: 1}, {name: 'readme.md', type: 'file', size: 4}]}, '/missing', 'new']},
        ],
    },
    {
        uid: 'rotate-an-avl-subtree-left',
        group: 'AVL trees',
        level: 2,
        title: 'Rotate an AVL subtree left',
        fn: 'avl_rotate_left',
        params: ['root'],
        signature: 'function avl_rotate_left(root)',
        brief: 'Rotate left around the root of a binary search subtree.',
        rules: ['If there is no right child, return the tree as it is. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'A rotation moves nodes up and down without changing their left-to-right order, so a binary search tree stays a search tree. A left rotation lifts the right child, the pivot, into the root’s place and drops the old root to the pivot’s left.\n\nCall the old root x and the pivot y, with A the left subtree of x, and B and C the left and right subtrees of y. In order, the keys go A, x, B, y, C. After the rotation y is on top, with x on its left and C still on its right, and x keeps A on its left. B, the keys between x and y, is the one subtree that moves: it was y’s left subtree and becomes x’s right one, the only place left between x and y. The inorder sequence is still A, x, B, y, C.\n\nOnly x and y change, so to keep the input unchanged make two new nodes for them and share A, B and C as they are. Without a right child there is no pivot, and the tree comes back as it is; so does the empty tree.',
            example: 'The root 5 has the right child 8, so 8 is the pivot. Here A, B and C are all `null`: 5 has no left child, and 8 has no children. The new 5 gets A on its left and B on its right, both `null`; the new 8 gets the new 5 on its left and C, `null`, on its right. The result is 8 with the left child 5, and the inorder sequence is 5, 8 before and after.',
            cost: 'Time and memory O(1): two new nodes, whatever the size of the subtrees, which are shared, not copied.',
            pitfalls: [
                'Forgetting B, the pivot’s left subtree, drops its keys from the tree: when 10 has the right child 30 and 30 the left child 20, the node 20 has to end up as the right child of 10.',
                'Setting `root.right = pivot.left` and `pivot.left = root` on the input’s own nodes changes the input, which has to stay unchanged.',
                'Reading `root.right.left` without checking for `null` throws on a tree with no right child, which should come back as it is.',
            ],
        },
        sources: [
            {title: 'Tree rotation, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_rotation'},
            {title: 'AVL tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/AVL_tree#Simple_rotation'},
            {title: 'AVL Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/AVLtree.html'},
        ],
        hints: ['The old right child becomes the new root.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function avl_rotate_left(root)
{
    if ((root === null) || (root.right === null)) {
        return root;
    }
    const pivot = root.right;
    const left = {value: root.value, left: root.left, right: pivot.left};
    return {value: pivot.value, left, right: pivot.right};
}`,
        solution_php: `<?php

function avl_rotate_left($root)
{
    if (($root === null) || ($root->right === null)) {
        return $root;
    }
    $pivot = $root->right;
    $left = (object) ['value' => $root->value, 'left' => $root->left, 'right' => $pivot->left];
    return (object) ['value' => $pivot->value, 'left' => $left, 'right' => $pivot->right];
}`,
        cases: [
            {label: 'Preserve the middle subtree', args: [{value: 10, left: {value: 5, left: null, right: null}, right: {value: 30, left: {value: 20, left: null, right: null}, right: {value: 40, left: null, right: null}}}]},
            {label: 'No middle subtree', args: [{value: 1, left: null, right: {value: 2, left: null, right: null}}]},
            {label: 'No right pivot', args: [{value: 2, left: {value: 1, left: null, right: null}, right: null}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'rotate-an-avl-subtree-right',
        group: 'AVL trees',
        level: 2,
        title: 'Rotate an AVL subtree right',
        fn: 'avl_rotate_right',
        params: ['root'],
        signature: 'function avl_rotate_right(root)',
        brief: 'Rotate right around the root of a binary search subtree.',
        rules: ['If there is no left child, return the tree as it is. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'A right rotation is the mirror of the left one: the left child, the pivot, rises into the root’s place, and the old root drops to the pivot’s right. It moves nodes up and down without changing their left-to-right order, so a binary search tree stays a search tree.\n\nCall the old root y and the pivot x, with A and B the left and right subtrees of x, and C the right subtree of y. In order, the keys go A, x, B, y, C. After the rotation x is on top, with A still on its left and y on its right; y keeps C on its right and takes B on its left, since B holds the keys between x and y. The inorder sequence stays A, x, B, y, C.\n\nOnly x and y change: make two new nodes for them and share A, B and C, which keeps the input unchanged. Without a left child there is no pivot, and the tree comes back as it is; so does the empty tree.',
            example: 'The root 5 has no left child, so there is no pivot to lift, and the tree comes back as it is: 5 with the right child 8. The mirror tree, 8 with the left child 5, does rotate: 5 is the pivot, the new 8 takes the pivot’s right subtree, `null`, as its left, and the result is 5 with the right child 8.',
            cost: 'Time and memory O(1): two new nodes; the subtrees are shared, not copied.',
            pitfalls: [
                'Forgetting B, the pivot’s right subtree, drops its keys: when 30 has the left child 10 and 10 the right child 20, the node 20 has to end up as the left child of 30.',
                'Changing `root.left` and `pivot.right` on the input’s own nodes rotates the input itself, which has to stay unchanged.',
                'Reading `root.left.right` without checking for `null` throws on a tree with no left child, which should come back as it is.',
            ],
        },
        sources: [
            {title: 'Tree rotation, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_rotation'},
            {title: 'AVL tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/AVL_tree#Simple_rotation'},
            {title: 'AVL Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/AVLtree.html'},
        ],
        hints: ['The old left child becomes the new root.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function avl_rotate_right(root)
{
    if ((root === null) || (root.left === null)) {
        return root;
    }
    const pivot = root.left;
    const right = {value: root.value, left: pivot.right, right: root.right};
    return {value: pivot.value, left: pivot.left, right};
}`,
        solution_php: `<?php

function avl_rotate_right($root)
{
    if (($root === null) || ($root->left === null)) {
        return $root;
    }
    $pivot = $root->left;
    $right = (object) ['value' => $root->value, 'left' => $pivot->right, 'right' => $root->right];
    return (object) ['value' => $pivot->value, 'left' => $pivot->left, 'right' => $right];
}`,
        cases: [
            {label: 'Preserve the middle subtree', args: [{value: 30, left: {value: 10, left: {value: 5, left: null, right: null}, right: {value: 20, left: null, right: null}}, right: {value: 40, left: null, right: null}}]},
            {label: 'No middle subtree', args: [{value: 2, left: {value: 1, left: null, right: null}, right: null}]},
            {label: 'No left pivot', args: [{value: 2, left: null, right: {value: 3, left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'rebalance-the-root-of-an-avl-tree',
        group: 'AVL trees',
        level: 3,
        title: 'Rebalance the root of an AVL tree',
        fn: 'avl_balance_root',
        params: ['root'],
        signature: 'function avl_balance_root(root)',
        brief: 'Rebalance a BST whose two child subtrees are AVL trees and whose root imbalance is at most two.',
        rules: ['Use the appropriate single or double rotation. When the root is already balanced, return the tree as it is. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {
            approach: 'An AVL tree keeps the heights of the two subtrees of every node within 1 of each other. Here both subtrees of the root are AVL trees already, and only the root may be off, by 2 at most. Measure it: balance = height(left) − height(right), with `null` of height 0 and a leaf of height 1. From −1 to 1 the tree is balanced and comes back as it is.\n\nAt 2 the left side is too tall, and a right rotation lifts it by one level, but only when the extra height is on the outside, in the left child’s left subtree: the left-left case. When it is on the inside, in the left child’s right subtree (left-right), a right rotation just carries it over to the other side. So first rotate the left child left, which brings the tall part outside, then rotate the root right: a double rotation. At −2 everything is mirrored: right-right takes one left rotation; right-left takes a right rotation of the right child, then a left rotation of the root.\n\nThe double rotation is only for a child strictly taller inside; when the heavy child is even, the single rotation is the one that works. Every rotation keeps the inorder sequence, so the result is still a search tree. To keep the input unchanged, rotate copies of the nodes.',
            example: 'The root 5 has no left child, height 0, and the right child 8, a leaf of height 1. The balance is 0 − 1 = −1, within the limit, so the tree comes back as it is. Had 8 a left child 7, the balance would be −2 with the tall part inside, the right-left case: 8 rotates right, giving 7 with the right child 8, then 5 rotates left, and 7 is the new root with the children 5 and 8.',
            cost: 'Time O(n) to measure the heights by walking the subtrees, since the nodes do not store them; the rotations are O(1). Memory O(h) for the height recursion. An AVL tree that stores each node’s height, or its balance factor, checks the root in O(1).',
            pitfalls: [
                'Rotating the root right in the left-right case leaves it off by 2 the other way: the inside subtree just crosses over with the pivot.',
                'Choosing the double rotation when the heavy child is even, with `>=` in place of `>`, leaves a node off by 2; after an insert that child is never even, but this task allows it.',
                'Rotating the child first with `root.left = rotate_left(root.left)` writes into the input, which has to stay unchanged.',
            ],
        },
        sources: [
            {title: 'AVL tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/AVL_tree#Rebalancing'},
            {title: 'Tree rotation, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_rotation#Rotations_for_rebalancing'},
            {title: 'AVL Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/AVLtree.html'},
        ],
        hints: ['Compare left and right heights at the root, then inspect the heavy child.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function avl_balance_root(root)
{
    if (root === null) {
        return null;
    }
    const balance = height(root.left) - height(root.right);
    if (balance > 1) {
        const left = root.left;
        if (height(left.right) > height(left.left)) {
            return rotate_right({...root, left: rotate_left(left)});
        }
        return rotate_right(root);
    }
    if (balance < -1) {
        const right = root.right;
        if (height(right.left) > height(right.right)) {
            return rotate_left({...root, right: rotate_right(right)});
        }
        return rotate_left(root);
    }
    return root;
    function height(current) {
        return (current === null) ? 0 : 1 + Math.max(height(current.left), height(current.right));
    }
    function rotate_left(current) {
        const pivot = current.right;
        const left = {...current, right: pivot.left};
        return {...pivot, left};
    }
    function rotate_right(current) {
        const pivot = current.left;
        const right = {...current, left: pivot.right};
        return {...pivot, right};
    }
}`,
        solution_php: `<?php

function avl_balance_root($root)
{
    if ($root === null) {
        return null;
    }
    $balance = avl_balance_root_height($root->left) - avl_balance_root_height($root->right);
    if ($balance > 1) {
        $left = $root->left;
        if (avl_balance_root_height($left->right) > avl_balance_root_height($left->left)) {
            $rotated = (object) [...(array) $root, 'left' => avl_balance_root_rotate_left($left)];
            return avl_balance_root_rotate_right($rotated);
        }
        return avl_balance_root_rotate_right($root);
    }
    if ($balance < -1) {
        $right = $root->right;
        if (avl_balance_root_height($right->left) > avl_balance_root_height($right->right)) {
            $rotated = (object) [...(array) $root, 'right' => avl_balance_root_rotate_right($right)];
            return avl_balance_root_rotate_left($rotated);
        }
        return avl_balance_root_rotate_left($root);
    }
    return $root;
}

function avl_balance_root_height($current)
{
    if ($current === null) {
        return 0;
    }
    return 1 + max(avl_balance_root_height($current->left), avl_balance_root_height($current->right));
}

function avl_balance_root_rotate_left($current)
{
    $pivot = $current->right;
    $left = (object) [...(array) $current, 'right' => $pivot->left];
    return (object) [...(array) $pivot, 'left' => $left];
}

function avl_balance_root_rotate_right($current)
{
    $pivot = $current->left;
    $right = (object) [...(array) $current, 'left' => $pivot->right];
    return (object) [...(array) $pivot, 'right' => $right];
}`,
        cases: [
            {label: 'Left-left case', args: [{value: 30, left: {value: 20, left: {value: 10, left: null, right: null}, right: null}, right: null}]},
            {label: 'Right-right case', args: [{value: 10, left: null, right: {value: 20, left: null, right: {value: 30, left: null, right: null}}}]},
            {label: 'Left-right case', args: [{value: 30, left: {value: 10, left: null, right: {value: 20, left: null, right: null}}, right: null}]},
            {label: 'Right-left case', args: [{value: 10, left: null, right: {value: 30, left: {value: 20, left: null, right: null}, right: null}}]},
            {label: 'Balanced tree', args: [{value: 4, left: {value: 1, left: {value: 0, left: null, right: null}, right: null}, right: {value: 8, left: {value: 6, left: null, right: null}, right: {value: 9, left: null, right: null}}}]},
            {label: 'Empty tree', args: [null]},
            {label: 'A heavy left child with even sides: one rotation', args: [{value: 8, left: {value: 4, left: {value: 2, left: {value: 1, left: null, right: null}, right: {value: 3, left: null, right: null}}, right: {value: 6, left: null, right: {value: 7, left: null, right: null}}}, right: {value: 10, left: null, right: null}}]},
            {label: 'A heavy right child with even sides: one rotation', args: [{value: 3, left: {value: 1, left: null, right: null}, right: {value: 7, left: {value: 5, left: {value: 4, left: null, right: null}, right: null}, right: {value: 9, left: {value: 8, left: null, right: null}, right: {value: 10, left: null, right: null}}}}]},
        ],
    },
    {
        uid: 'insert-a-key-into-an-avl-tree',
        group: 'AVL trees',
        level: 3,
        title: 'Insert a key into an AVL tree',
        fn: 'avl_insert',
        params: ['root', 'value'],
        signature: 'function avl_insert(root, value)',
        brief: 'Insert a value into a valid strict AVL search tree and return the balanced tree.',
        rules: ['Treat a duplicate as a no-op. On the way back from insertion, fix each unbalanced node with the standard single or double AVL rotation. Keep the input unchanged.'],
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}, value: 7}},
        explanation: {
            approach: 'Start with an ordinary binary search tree insert: go left when `value` is smaller than the node’s, right when it is larger, down to a `null` place, and put a new leaf there. If a node already has the `value`, there is nothing to insert, and the tree comes back as it is.\n\nThe new leaf can make subtrees one level taller, and only the nodes on its way down, its ancestors, can go out of balance. So check them on the way back up, as the recursion returns: at each node, balance = height(left) − height(right). At 2 or −2, fix it as when rebalancing the root: a single rotation when the taller grandchild is on the outside (left-left, right-right), a double one when it is on the inside (left-right, right-left). After an insert one fix is enough: the rotated subtree gets back the height it had before, so the nodes above see no change.\n\nTo keep the input unchanged, copy each node on the way down (`{...root}`) and give the copy the new child; the subtrees off the path are shared. That is path copying.',
            example: 'With `value` = 7: 7 is larger than 5, so go right; smaller than 8, so go left, to a `null` place, where the new leaf 7 goes. On the way back, 8 has the left child 7 and no right one: balance 1, fine. At 5 the left side has height 0 and the right side, 8 over 7, height 2: balance −2. The right child 8 leans left, to the inside, so this is the right-left case: rotate 8 right, giving 7 over 8, then rotate 5 left. The result is 7 with the left child 5 and the right child 8.',
            cost: 'An AVL tree is at most about 1.44 × log2 n high, so the path, the copies on it and the rotations are O(log n). Measuring heights by walking subtrees, since the nodes store none, adds up to O(n) per insert; a height stored in each node brings the whole insert down to O(log n). Memory O(log n) for the recursion and the copied nodes.',
            pitfalls: [
                'Checking the balance only at the new leaf’s parent misses the nodes above it, where the imbalance usually shows: inserting 20 under 10 under 30 puts 30 out of balance, not 10.',
                'Sending an equal `value` to the right, as a plain `else` does, inserts a duplicate; test for equality first and return the tree as it is.',
                'Writing the new child into the input’s node (`root.left = ...`) changes the input; copy the node first.',
            ],
        },
        sources: [
            {title: 'AVL tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/AVL_tree#Insert'},
            {title: 'AVL Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/AVLtree.html'},
            {title: 'Persistent data structure, Wikipedia', url: 'https://en.wikipedia.org/wiki/Persistent_data_structure#Path_copying'},
        ],
        hints: ['First do a BST insert, then look at the height difference on the return path.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function avl_insert(root, value)
{
    if (root === null) {
        return {value, left: null, right: null};
    }
    if (root.value === value) {
        return root;
    }
    let out = {...root};
    if (value < root.value) {
        out.left = avl_insert(root.left, value);
    }
    else {
        out.right = avl_insert(root.right, value);
    }
    if (balance(out) > 1) {
        if (balance(out.left) < 0) {
            out.left = rotate_left(out.left);
        }
        out = rotate_right(out);
    }
    else if (balance(out) < -1) {
        if (balance(out.right) > 0) {
            out.right = rotate_right(out.right);
        }
        out = rotate_left(out);
    }
    return out;
    function balance(current) {
        return height(current.left) - height(current.right);
    }
    function height(current) {
        return (current === null) ? 0 : 1 + Math.max(height(current.left), height(current.right));
    }
    function rotate_left(current) {
        const pivot = current.right;
        const left = {...current, right: pivot.left};
        return {...pivot, left};
    }
    function rotate_right(current) {
        const pivot = current.left;
        const right = {...current, left: pivot.right};
        return {...pivot, right};
    }
}`,
        solution_php: `<?php

function avl_insert($root, $value)
{
    if ($root === null) {
        return (object) ['value' => $value, 'left' => null, 'right' => null];
    }
    if ($root->value === $value) {
        return $root;
    }
    $out = clone $root;
    if ($value < $root->value) {
        $out->left = avl_insert($root->left, $value);
    }
    else {
        $out->right = avl_insert($root->right, $value);
    }
    if (avl_insert_balance($out) > 1) {
        if (avl_insert_balance($out->left) < 0) {
            $out->left = avl_insert_rotate_left($out->left);
        }
        $out = avl_insert_rotate_right($out);
    }
    elseif (avl_insert_balance($out) < -1) {
        if (avl_insert_balance($out->right) > 0) {
            $out->right = avl_insert_rotate_right($out->right);
        }
        $out = avl_insert_rotate_left($out);
    }
    return $out;
}

function avl_insert_balance($current)
{
    return avl_insert_height($current->left) - avl_insert_height($current->right);
}

function avl_insert_height($current)
{
    if ($current === null) {
        return 0;
    }
    return 1 + max(avl_insert_height($current->left), avl_insert_height($current->right));
}

function avl_insert_rotate_left($current)
{
    $pivot = $current->right;
    $left = (object) [...(array) $current, 'right' => $pivot->left];
    return (object) [...(array) $pivot, 'left' => $left];
}

function avl_insert_rotate_right($current)
{
    $pivot = $current->left;
    $right = (object) [...(array) $current, 'left' => $pivot->right];
    return (object) [...(array) $pivot, 'right' => $right];
}`,
        cases: [
            {label: 'Left-right rebalance', args: [{value: 30, left: {value: 10, left: null, right: null}, right: null}, 20]},
            {label: 'Right-left rebalance', args: [{value: 10, left: null, right: {value: 30, left: null, right: null}}, 20]},
            {label: 'Left-left rebalance', args: [{value: 30, left: {value: 20, left: null, right: null}, right: null}, 10]},
            {label: 'Right-right rebalance', args: [{value: 10, left: null, right: {value: 20, left: null, right: null}}, 30]},
            {label: 'Duplicate key', args: [{value: 4, left: {value: 1, left: {value: 0, left: null, right: null}, right: null}, right: {value: 8, left: {value: 6, left: null, right: null}, right: {value: 9, left: null, right: null}}}, 8]},
            {label: 'Empty input', args: [null, 0]},
        ],
    },
    {
        uid: 'find-adjacent-red-nodes',
        group: 'Red-black trees',
        level: 1,
        title: 'Find adjacent red nodes',
        fn: 'rb_list_red_edges',
        params: ['root'],
        signature: 'function rb_list_red_edges(root)',
        brief: 'Return [parentValue, childValue] for each edge whose endpoints are both red.',
        rules: ['Walk parents in preorder, testing their left edge before their right edge. Return [] for a null root.'],
        input: {text: 'Use value, color, left, and right. Color is either "red" or "black". A missing branch is null. Missing branches add zero when counting actual black nodes.', example: {root: {value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}}},
        explanation: {
            approach: 'A red-black tree forbids a red node with a red child; such an edge is called a red violation. Finding all of them is a full walk: every edge from a parent to a child is looked at once, from the parent’s side, and it is a violation when both ends are red.\n\nThe order is the rule’s: walk parents in preorder, and at each red parent test its left edge, then its right edge, before going down. So at a node, push `[value, left.value]` if the node and its left child are both red, then the same for the right child, and only then walk the left subtree and the right subtree. A black parent has no violating edge, but its subtrees still have to be searched, and so do the subtrees below a violation. A `null` child has no color: check for it before reading `color`.',
            example: 'The root 4 is black, so neither of its edges counts, though its left child 2 is red. The walk goes on to 2: it is red, but both its children are `null`, so it has no edges. Nothing is pushed, and the result is `[]`. Had 2 a red left child 1, the edge `[2, 1]` would be the one result.',
            cost: 'Time O(n): each node is visited once and each edge tested once. Memory O(h) for the recursion; h is about 2 × log2 n at most in a valid red-black tree, but the trees here can have any shape.',
            pitfalls: [
                'Walking the left subtree between the two edge tests gives `[10, 5], [5, 2], [10, 15]`; both edges of 10 come first: `[10, 5], [10, 15], [5, 2]`.',
                'Stopping at the first violation, or not walking below one, misses the deeper ones, like `[5, 2]` under `[10, 5]`.',
                'Reading `child.color` on a `null` child throws, and every leaf has two of them.',
            ],
        },
        sources: [
            {title: 'Red–black tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Properties'},
            {title: 'Red/Black Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/RedBlack.html'},
        ],
        hints: ['Check the color of the current parent and its children separately.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function rb_list_red_edges(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (current === null) {
            return;
        }
        if (current.color === 'red') {
            for (const child of [current.left, current.right]) {
                if (child?.color === 'red') {
                    out.push([current.value, child.value]);
                }
            }
        }
        visit(current.left);
        visit(current.right);
    }
}`,
        solution_php: `<?php

function rb_list_red_edges($root)
{
    $out = [];
    rb_list_red_edges_visit($root, $out);
    return $out;
}

function rb_list_red_edges_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    if ($current->color === 'red') {
        foreach ([$current->left, $current->right] as $child) {
            if ($child?->color === 'red') {
                $out[] = [$current->value, $child->value];
            }
        }
    }
    rb_list_red_edges_visit($current->left, $out);
    rb_list_red_edges_visit($current->right, $out);
}`,
        cases: [
            {label: 'Both child edges then the deeper edge', args: [{value: 10, color: 'red', left: {value: 5, color: 'red', left: {value: 2, color: 'red', left: null, right: null}, right: null}, right: {value: 15, color: 'red', left: null, right: null}}]},
            {label: 'Separated red nodes', args: [{value: 10, color: 'red', left: {value: 5, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}, right: null}]},
            {label: 'No violations in left-leaning sample', args: [{value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'calculate-black-height',
        group: 'Red-black trees',
        level: 2,
        title: 'Calculate black height',
        fn: 'rb_measure_black_height',
        params: ['root'],
        signature: 'function rb_measure_black_height(root)',
        brief: 'Count black nodes from the root to a missing child on every possible path.',
        rules: ['Include the root if black. Missing children contribute zero. Return -1 if any two paths differ.'],
        input: {text: 'Use value, color, left, and right. Color is either "red" or "black". A missing branch is null. Missing branches add zero when counting actual black nodes.', example: {root: {value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}}},
        explanation: {
            approach: 'The black height of a tree is the number of black nodes on a path from its root down to a missing child, the same on every path in a red-black tree. Here a missing child counts 0 and a black root counts 1, as the rules say; some books count the `null` leaves as black, which gives one more.\n\nThe value comes from the bottom up, a postorder walk: the black height of a node is the black height of its children, the same for both, plus 1 if the node is black. So call the function on both children. If either one returned `-1`, or the two differ, the paths below do not agree, and the answer is `-1`. Otherwise add the node’s own 1 or 0 and return the sum. A `null` tree returns 0. The `-1` has to pass up from any depth, so it is checked before anything is added to it.',
            example: 'The red leaf 2 has two `null` children, 0 and 0: they agree, and a red node adds nothing, so 2 returns 0. The root’s right child is `null`, 0. The root 4 sees 0 and 0, equal, and adds 1 for being black. The result is 1: every path from 4 to a missing child, through 2 or straight to its empty right side, meets one black node.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the recursion.',
            pitfalls: [
                'Testing only `left !== right` lets two failing children through: `-1` and `-1` are equal, and a black node turns them into 0.',
                'Following one path only, the leftmost for instance, gives a number even when another path differs and the answer is `-1`.',
                'Counting the `null` children as black gives one more than expected on every tree, and 1 for the empty tree.',
            ],
        },
        sources: [
            {title: 'Red–black tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Terminology'},
            {title: 'Red/Black Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/RedBlack.html'},
        ],
        hints: ['Compare both child results before adding the color contribution.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function rb_measure_black_height(root)
{
    if (root === null) {
        return 0;
    }
    const left = rb_measure_black_height(root.left);
    const right = rb_measure_black_height(root.right);
    if ((left < 0) || (left !== right)) {
        return -1;
    }
    return left + ((root.color === 'black') ? 1 : 0);
}`,
        solution_php: `<?php

function rb_measure_black_height($root)
{
    if ($root === null) {
        return 0;
    }
    $left = rb_measure_black_height($root->left);
    $right = rb_measure_black_height($root->right);
    if (($left < 0) || ($left !== $right)) {
        return -1;
    }
    return $left + (($root->color === 'black') ? 1 : 0);
}`,
        cases: [
            {label: 'Black root and children', args: [{value: 4, color: 'black', left: {value: 2, color: 'black', left: null, right: null}, right: {value: 6, color: 'black', left: null, right: null}}]},
            {label: 'Red leaf adds zero', args: [{value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}]},
            {label: 'Unequal paths', args: [{value: 3, color: 'black', left: {value: 2, color: 'black', left: null, right: null}, right: null}]},
            {label: 'Red root contributes zero', args: [{value: 0, color: 'red', left: null, right: null}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'validate-a-red-black-search-tree',
        group: 'Red-black trees',
        level: 3,
        title: 'Validate a red-black search tree',
        fn: 'is_red_black_tree',
        params: ['root'],
        signature: 'function is_red_black_tree(root)',
        brief: 'Check strict BST order, a black root, no red-to-red edges, and equal black height on all paths.',
        rules: ['Null children are allowed. A null root is valid. Red links may lean either way.'],
        input: {text: 'Use value, color, left, and right. Color is either "red" or "black". A missing branch is null. Missing branches add zero when counting actual black nodes.', example: {root: {value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}}},
        explanation: {
            approach: 'Four rules to check: the keys are in strict search order, the root is black, no red node has a red child, and every path from the root to a missing child has the same number of black nodes. Red links may lean either way: this is the general red-black tree, not the left-leaning kind.\n\nOne recursive walk checks them all. For order, carry the range a key must fall in: the root’s is (−∞, ∞); a left child’s is its parent’s range cut off at the parent’s value from above, a right child’s cut off from below. Checking a node against its parent alone misses a key on the wrong side of a grandparent. For red-red, pass down whether the parent is red. For black height, return it from each call, as when measuring black height, or `-1` for any failure, so one number carries both the height and the verdict.\n\nThe root rule is checked once, at the top: a `null` root is valid, and any other must be black and get a result of 0 or more.',
            example: 'The root 4 is black, and its range is (−∞, ∞). Its left child 2 is red under a black parent and fits the range (−∞, 4). 2 has two `null` children, 0 each; they agree, and red adds nothing, so 2 returns 0. The root’s right child is `null`, 0. The two sides agree, so 4 adds 1 and returns 1, not `-1`, and the root is black: the result is `true`.',
            cost: 'Time O(n): each node is visited once. Memory O(h) for the recursion.',
            pitfalls: [
                'Comparing each key with its parent only accepts 5 as the right child of 2 under the root 4, though 5 sits in 4’s left subtree; carry the bounds down.',
                'Forgetting the root rule accepts a lone red node, which must give `false`.',
                'Requiring red links to lean left rejects valid trees: a black 4 with a red right child 6 is a red-black tree.',
            ],
        },
        sources: [
            {title: 'Red–black tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Red%E2%80%93black_tree#Properties'},
            {title: 'Binary search tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Binary_search_tree'},
            {title: 'Red/Black Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/RedBlack.html'},
        ],
        hints: ['Carry value bounds and return black height from each subtree.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function is_red_black_tree(root)
{
    return (root === null) || ((root.color === 'black') && (height(root, -Infinity, Infinity, false) >= 0));
    function height(current, min, max, parent_red) {
        if (current === null) {
            return 0;
        }
        const red = current.color === 'red';
        if ((current.value <= min) || (current.value >= max) || (red && parent_red)) {
            return -1;
        }
        const left = height(current.left, min, current.value, red);
        const right = height(current.right, current.value, max, red);
        if ((left < 0) || (left !== right)) {
            return -1;
        }
        return left + (red ? 0 : 1);
    }
}`,
        solution_php: `<?php

function is_red_black_tree($root)
{
    return ($root === null) || (($root->color === 'black') && (is_red_black_tree_height($root, -INF, INF, false) >= 0));
}

function is_red_black_tree_height($current, $min, $max, $parent_red)
{
    if ($current === null) {
        return 0;
    }
    $red = ($current->color === 'red');
    if (($current->value <= $min) || ($current->value >= $max) || ($red && $parent_red)) {
        return -1;
    }
    $left = is_red_black_tree_height($current->left, $min, $current->value, $red);
    $right = is_red_black_tree_height($current->right, $current->value, $max, $red);
    if (($left < 0) || ($left !== $right)) {
        return -1;
    }
    return $left + ($red ? 0 : 1);
}`,
        cases: [
            {label: 'Balanced black levels', args: [{value: 4, color: 'black', left: {value: 2, color: 'black', left: null, right: null}, right: {value: 6, color: 'black', left: null, right: null}}]},
            {label: 'A red right link is allowed', args: [{value: 4, color: 'black', left: null, right: {value: 6, color: 'red', left: null, right: null}}]},
            {label: 'Red root', args: [{value: 4, color: 'red', left: null, right: null}]},
            {label: 'Two red nodes in a row', args: [{value: 4, color: 'black', left: {value: 2, color: 'red', left: {value: 1, color: 'red', left: null, right: null}, right: null}, right: null}]},
            {label: 'Black height mismatch', args: [{value: 4, color: 'black', left: {value: 2, color: 'black', left: null, right: null}, right: null}]},
            {label: 'Ancestor bound is broken', args: [{value: 4, color: 'black', left: {value: 2, color: 'black', left: null, right: {value: 5, color: 'red', left: null, right: null}}, right: {value: 8, color: 'black', left: null, right: null}}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'insert-into-a-left-leaning-red-black-tree',
        group: 'Red-black trees',
        level: 3,
        title: 'Insert into a left-leaning red-black tree',
        fn: 'llrb_insert',
        params: ['root', 'value'],
        signature: 'function llrb_insert(root, value)',
        brief: 'Insert a key into a valid left-leaning red-black search tree.',
        rules: ['On each return, rotate left for a red right link with a non-red left link, rotate right for two consecutive red left links, then flip colors for two red children. Color the root black. Duplicate keys are a no-op. Keep the input unchanged.'],
        input: {text: 'Use value, color, left, and right. Color is either "red" or "black". A missing branch is null. Missing branches add zero when counting actual black nodes.', example: {root: {value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}, value: 3}},
        explanation: {
            approach: 'A left-leaning red-black tree is a 2-3 tree drawn as a binary tree: a black node and its red left child together stand for one 3-node, a node of two keys, and a red link always leans left. An insert puts the new key into a node at the bottom; when that makes a temporary node of three keys, the node splits and its middle key moves up into the parent.\n\nIn code: insert as in a binary search tree, with the new leaf red, then fix the links on the way back up, at every node, with three local steps in this order. A red right child and a non-red left one: rotate left, so the red link leans left. A red left child with a red left child of its own: rotate right, which makes both reds children of one node. Two red children: flip the colors, the node turns red and both children black; this is the split, and the red node is the middle key moving up. Each step can set up the next, so they are three separate `if`s, not an `else if` chain.\n\nA rotation keeps the subtree’s color on top: the promoted node takes the old top’s color, and the demoted one turns red. After the last return, color the root black. A duplicate changes nothing. To keep the input unchanged, copy each node you change.',
            example: 'With `value` = 3: 3 is smaller than 4, go left; larger than 2, go right; and the new red leaf 3 becomes 2’s right child. Back at 2: a red right child and no red left one, so rotate left: 3 rises and takes the red that 2 had, and 2 becomes its red left child. Back at 4: its left child 3 is red, and so is 3’s left child 2, so rotate right: 3 rises again and takes 4’s black, and 4 becomes its red right child. Now 3 has two red children, 2 and 4: flip, 3 turns red, 2 and 4 black. The root is colored black, and the result is a black 3 with the black children 2 and 4.',
            cost: 'Time O(log n): the height is at most about 2 × log2 n, and each step on the way back is O(1). Memory O(log n) for the recursion and the copied nodes on the path.',
            pitfalls: [
                'Writing the three fixes as `else if` stops after the right rotation at 4 and leaves 3 with two red children, never flipped.',
                'A rotation that leaves each node its own color breaks the black height: here it ends with a black 3 over a red 2 and a black 4, one black node on the left path and two on the right.',
                'Forgetting to color the root black leaves the first key red, where the case with an empty tree expects a black root.',
            ],
        },
        sources: [
            {title: 'Left-leaning red–black tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/Left-leaning_red%E2%80%93black_tree'},
            {title: 'Left-leaning Red-Black Trees, Robert Sedgewick (PDF)', url: 'https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf'},
            {title: 'Balanced Search Trees, Algorithms, 4th edition, Princeton', url: 'https://algs4.cs.princeton.edu/33balanced/'},
        ],
        hints: ['Add an ordinary BST leaf colored red, then fix links bottom up.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function llrb_insert(root, value)
{
    const out = insert(root);
    return {...out, color: 'black'};
    function insert(current) {
        if (current === null) {
            return {value, color: 'red', left: null, right: null};
        }
        if (current.value === value) {
            return current;
        }
        let next = {...current};
        if (value < current.value) {
            next.left = insert(current.left);
        }
        else {
            next.right = insert(current.right);
        }
        if (is_red(next.right) && !is_red(next.left)) {
            const pivot = next.right;
            const left = {...next, color: 'red', right: pivot.left};
            next = {...pivot, color: next.color, left};
        }
        if (is_red(next.left) && is_red(next.left.left)) {
            const pivot = next.left;
            const right = {...next, color: 'red', left: pivot.right};
            next = {...pivot, color: next.color, right};
        }
        if (is_red(next.left) && is_red(next.right)) {
            next = {...next, color: flip(next.color), left: {...next.left, color: 'black'}, right: {...next.right, color: 'black'}};
        }
        return next;
    }
    function is_red(current) {
        return current?.color === 'red';
    }
    function flip(color) {
        return (color === 'red') ? 'black' : 'red';
    }
}`,
        solution_php: `<?php

function llrb_insert($root, $value)
{
    $out = llrb_insert_into($root, $value);
    return (object) [...(array) $out, 'color' => 'black'];
}

function llrb_insert_into($current, $value)
{
    if ($current === null) {
        return (object) ['value' => $value, 'color' => 'red', 'left' => null, 'right' => null];
    }
    if ($current->value === $value) {
        return $current;
    }
    $next = clone $current;
    if ($value < $current->value) {
        $next->left = llrb_insert_into($current->left, $value);
    }
    else {
        $next->right = llrb_insert_into($current->right, $value);
    }
    if (llrb_insert_is_red($next->right) && !llrb_insert_is_red($next->left)) {
        $pivot = $next->right;
        $left = (object) [...(array) $next, 'color' => 'red', 'right' => $pivot->left];
        $next = (object) [...(array) $pivot, 'color' => $next->color, 'left' => $left];
    }
    if (llrb_insert_is_red($next->left) && llrb_insert_is_red($next->left->left)) {
        $pivot = $next->left;
        $right = (object) [...(array) $next, 'color' => 'red', 'left' => $pivot->right];
        $next = (object) [...(array) $pivot, 'color' => $next->color, 'right' => $right];
    }
    if (llrb_insert_is_red($next->left) && llrb_insert_is_red($next->right)) {
        $next = (object) [
            ...(array) $next,
            'color' => llrb_insert_flip($next->color),
            'left' => (object) [...(array) $next->left, 'color' => 'black'],
            'right' => (object) [...(array) $next->right, 'color' => 'black'],
        ];
    }
    return $next;
}

function llrb_insert_is_red($current)
{
    return $current?->color === 'red';
}

function llrb_insert_flip($color)
{
    return ($color === 'red') ? 'black' : 'red';
}`,
        cases: [
            {label: 'Rotate a plain right insertion', args: [{value: 4, color: 'black', left: null, right: null}, 8]},
            {label: 'Insert a red left leaf', args: [{value: 4, color: 'black', left: null, right: null}, 2]},
            {label: 'Two red children trigger a flip', args: [{value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}, 6]},
            {label: 'Two left links trigger a right rotation', args: [{value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}, 1]},
            {label: 'Duplicate key', args: [{value: 4, color: 'black', left: {value: 2, color: 'black', left: null, right: null}, right: {value: 6, color: 'black', left: null, right: null}}, 2]},
            {label: 'An empty tree starts black', args: [null, 0]},
        ],
    },
    {
        uid: 'search-a-b-tree',
        group: 'B-trees',
        level: 2,
        title: 'Search a B-tree',
        fn: 'btree_find_key',
        params: ['root', 'target'],
        signature: 'function btree_find_key(root, target)',
        brief: 'Return whether target is present in a valid B-tree of minimum degree 2.',
        rules: ['Each node has one to three sorted keys. An internal node with k keys has k + 1 children. A null root returns false.'],
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}, target: 30}},
        explanation: {
            approach: 'A B-tree node holds sorted `keys`, and its `children` sit between them: child 0 holds the keys below `keys[0]`, child i the keys between `keys[i - 1]` and `keys[i]`, and the last child the keys above the last key. So the keys of a node cut the number line into ranges, and the `target` can only be in one of them.\n\nAt each node, find the first key at least as large as the `target`; call its index i, or `keys.length` when all keys are smaller. If `keys[i]` equals the `target`, it is found. Otherwise every key before i is smaller and `keys[i]` is larger, so the `target` can only be in `children[i]`: go there and repeat. A leaf has no children; having to go down from one means the `target` is not in the tree.\n\nThis is binary search tree search with more than one key per node, and it needs no recursion: a loop that moves `current` down is enough.',
            example: 'With `target` = 30: in the root `[20]`, 20 is smaller than 30, so i moves past it to 1, and `keys[1]` does not exist. Go down to `children[1]`, the leaf `[30]`: its first key is not smaller, so i is 0, and `keys[0]` is 30, the `target`. The result is `true`. With `target` = 25 the walk goes the same way, stops at i = 0 in `[30]`, where 30 is not 25, and the leaf has no child 0: `false`.',
            cost: 'Time O(h × k), k at most 3 keys per node, so O(log n): all leaves are at one depth and every internal node has 2 to 4 children, which keeps h within about log2 n. Memory O(1): a single loop going down.',
            pitfalls: [
                'Going to `children[i + 1]`, one past the first larger key, looks in the wrong range: for 24 in `[20, 40]` that is the child of the keys above 40.',
                'In a leaf `children[i]` is `undefined`, not `null`; a loop that tests `current !== null` goes on and reads `keys` of `undefined`.',
                'The empty tree, a `null` root, holds nothing and gives `false`.',
            ],
        },
        sources: [
            {title: 'B-tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/B-tree#Search'},
            {title: 'B-Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/BTree.html'},
            {title: 'B-Trees, OpenDSA CS3', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BTree.html'},
        ],
        hints: ['Find the first key at least as large as the target.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function btree_find_key(root, target)
{
    let current = root;
    while (current !== null) {
        let i = 0;
        while ((i < current.keys.length) && (current.keys[i] < target)) {
            ++i;
        }
        if (current.keys[i] === target) {
            return true;
        }
        current = current.children[i] ?? null;
    }
    return false;
}`,
        solution_php: `<?php

function btree_find_key($root, $target)
{
    $current = $root;
    while ($current !== null) {
        $i = 0;
        while (($i < count($current->keys)) && ($current->keys[$i] < $target)) {
            ++$i;
        }
        if (($i < count($current->keys)) && ($current->keys[$i] === $target)) {
            return true;
        }
        $current = $current->children[$i] ?? null;
    }
    return false;
}`,
        cases: [
            {label: 'Key in the root', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}, 40]},
            {label: 'Key in the middle child', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}, 24]},
            {label: 'Key in the last child', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}, 50]},
            {label: 'Missing between two keys', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}, 31]},
            {label: 'Empty tree', args: [null, 0]},
        ],
    },
    {
        uid: 'traverse-a-b-tree-in-sorted-order',
        group: 'B-trees',
        level: 2,
        title: 'Traverse a B-tree in sorted order',
        fn: 'btree_traverse_inorder',
        params: ['root'],
        signature: 'function btree_traverse_inorder(root)',
        brief: 'Return all keys of a valid B-tree of minimum degree 2 in ascending order.',
        rules: ['Keys are unique. Visit each child before the key to its right. Visit the final child after the last key.'],
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}}},
        explanation: {
            approach: 'This is the inorder walk of a binary search tree, widened to nodes with several keys. In a node with keys k0, k1, …, child 0 holds everything below k0, child 1 everything between k0 and k1, and so on, with the last child above the last key. So the sorted order of a node’s subtree is all of child 0, then k0, then all of child 1, then k1, and so on, and last all of the final child.\n\nIn code: for each index i, walk `children[i]`, then push `keys[i]`; after the loop, walk `children[keys.length]`, the one child after the last key. A leaf has no children, so `children[i]` is `undefined`, and its walk returns at once: a leaf gives just its keys, in order. The empty tree gives `[]`.',
            example: 'The root `[20]` has one key and two children. First walk `children[0]`, the leaf `[10]`: push 10. Then push the key 20. Then walk the last child, `children[1]`, the leaf `[30]`: push 30. The result is `[10, 20, 30]`.',
            cost: 'Time O(n), n the number of keys: each key is pushed once and each node visited once. Memory O(h) for the recursion, h about log2 n at most.',
            pitfalls: [
                'Pushing all of a node’s keys and then walking its children gives `[20, 10, 30]` here: a key goes between the children on its two sides.',
                'Forgetting the final child after the loop drops the keys of the last child: 50 under `[20, 40]`.',
                'Testing `current === null` misses the `undefined` children of a leaf and then reads their `keys`; test `!current`.',
            ],
        },
        sources: [
            {title: 'Tree traversal, Wikipedia', url: 'https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR'},
            {title: 'B-tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/B-tree#Definition'},
            {title: 'B-Trees, OpenDSA CS3', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BTree.html'},
        ],
        hints: ['A B-tree with two keys has a child between them as well as a child on either end.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function btree_traverse_inorder(root)
{
    const out = [];
    visit(root);
    return out;
    function visit(current) {
        if (!current) {
            return;
        }
        for (let i = 0, end = current.keys.length; i < end; ++i) {
            visit(current.children[i]);
            out.push(current.keys[i]);
        }
        visit(current.children[current.keys.length]);
    }
}`,
        solution_php: `<?php

function btree_traverse_inorder($root)
{
    $out = [];
    btree_traverse_inorder_visit($root, $out);
    return $out;
}

function btree_traverse_inorder_visit($current, &$out)
{
    if ($current === null) {
        return;
    }
    for ($i = 0, $end = count($current->keys); $i < $end; ++$i) {
        btree_traverse_inorder_visit($current->children[$i] ?? null, $out);
        $out[] = $current->keys[$i];
    }
    btree_traverse_inorder_visit($current->children[count($current->keys)] ?? null, $out);
}`,
        cases: [
            {label: 'Interleave all child slots', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}]},
            {label: 'Three keys in a leaf', args: [{keys: [10, 20, 30], children: []}]},
            {label: 'Negative and zero keys', args: [{keys: [0], children: [{keys: [-5], children: []}, {keys: [2], children: []}]}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'validate-a-b-tree',
        group: 'B-trees',
        level: 3,
        title: 'Validate a B-tree',
        fn: 'is_btree_valid',
        params: ['root'],
        signature: 'function is_btree_valid(root)',
        brief: 'Check whether the input is a B-tree of minimum degree 2 with unique keys.',
        rules: ['A nonempty node has one to three strictly ascending keys. Internal nodes have exactly one more child than keys. Keys must fit ancestor ranges and all leaves share a depth. A null root is valid.'],
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}}},
        explanation: {
            approach: 'A B-tree of minimum degree 2, also called a 2-3-4 tree, has four rules: every node has 1 to 3 keys in strictly ascending order; an internal node has exactly one more child than keys; every key lies inside the range its ancestors leave for it; and all leaves are at the same depth. The first two are local to one node; the last two need context passed down from the root.\n\nFor the ranges, carry `min` and `max`, open bounds, starting at −∞ and ∞. Each key must be greater than the one before it, the first one greater than `min`, and all below `max`. Then child i gets the range between `keys[i - 1]` and `keys[i]`, with `min` and `max` standing in at the two ends. Checking a child against its parent’s keys only is not enough: a key can fit between its parent’s keys and still be on the wrong side of a grandparent’s.\n\nFor the depth, carry it down too, and remember the depth of the first leaf reached; every other leaf must have the same. Any failure returns `false` at once. A `null` root is valid.',
            example: 'The root `[20]` has one key, inside (−∞, ∞), and two children, one more than its keys. Child 0, `[10]`, gets the range (−∞, 20): 10 fits, and it is a leaf at depth 1, the first leaf, so the leaf depth is 1. Child 1, `[30]`, gets (20, ∞): 30 fits, and it is a leaf at depth 1 as well. All checks pass: the result is `true`.',
            cost: 'Time O(n), n the number of keys: each key is checked once. Memory O(h) for the recursion.',
            pitfalls: [
                'Not comparing leaf depths accepts an uneven tree: a leaf at depth 1 next to leaves at depth 2.',
                'Letting a key equal a bound accepts a duplicate, 20 in the root and again in a child; both bounds are open.',
                'Walking the children without counting them accepts `[20, 40]` with two children, where three are needed.',
            ],
        },
        sources: [
            {title: 'B-tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/B-tree#Definition'},
            {title: '2–3–4 tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/2%E2%80%933%E2%80%934_tree#Properties'},
            {title: 'B-Trees, OpenDSA CS3', url: 'https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/BTree.html'},
        ],
        hints: ['Carry a key range and depth. Remember the depth of the first leaf.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function is_btree_valid(root)
{
    let leaf_depth = null;
    return (root === null) || visit(root, -Infinity, Infinity, 0);
    function visit(current, min, max, depth) {
        const {keys, children} = current;
        if ((keys.length < 1) || (keys.length > 3)) {
            return false;
        }
        let lower = min;
        for (const key of keys) {
            if ((key <= lower) || (key >= max)) {
                return false;
            }
            lower = key;
        }
        if (children.length === 0) {
            leaf_depth ??= depth;
            return leaf_depth === depth;
        }
        if (children.length !== keys.length + 1) {
            return false;
        }
        for (let i = 0, end = children.length; i < end; ++i) {
            if (!visit(children[i], keys[i - 1] ?? min, keys[i] ?? max, depth + 1)) {
                return false;
            }
        }
        return true;
    }
}`,
        solution_php: `<?php

function is_btree_valid($root)
{
    $leaf_depth = null;
    return ($root === null) || is_btree_valid_visit($root, -INF, INF, 0, $leaf_depth);
}

function is_btree_valid_visit($current, $min, $max, $depth, &$leaf_depth)
{
    $keys = $current->keys;
    $children = $current->children;
    if ((count($keys) < 1) || (count($keys) > 3)) {
        return false;
    }
    $lower = $min;
    foreach ($keys as $key) {
        if (($key <= $lower) || ($key >= $max)) {
            return false;
        }
        $lower = $key;
    }
    if (count($children) === 0) {
        $leaf_depth ??= $depth;
        return $leaf_depth === $depth;
    }
    if (count($children) !== count($keys) + 1) {
        return false;
    }
    for ($i = 0, $end = count($children); $i < $end; ++$i) {
        if (!is_btree_valid_visit($children[$i], $keys[$i - 1] ?? $min, $keys[$i] ?? $max, $depth + 1, $leaf_depth)) {
            return false;
        }
    }
    return true;
}`,
        cases: [
            {label: 'Valid two-level tree', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}]},
            {label: 'Wrong child count', args: [{keys: [20, 40], children: [{keys: [5], children: []}, {keys: [24], children: []}]}]},
            {label: 'Child crosses a separator', args: [{keys: [20], children: [{keys: [5, 25], children: []}, {keys: [30], children: []}]}]},
            {label: 'Unsuitable leaf depth', args: [{keys: [20], children: [{keys: [5], children: []}, {keys: [30], children: [{keys: [25], children: []}, {keys: [40], children: []}]}]}]},
            {label: 'Overflow', args: [{keys: [1, 2, 3, 4], children: []}]},
            {label: 'Unsorted keys', args: [{keys: [2, 1], children: []}]},
            {label: 'Duplicate key', args: [{keys: [2, 2], children: []}]},
            {label: 'Empty tree', args: [null]},
        ],
    },
    {
        uid: 'insert-into-a-b-tree',
        group: 'B-trees',
        level: 3,
        title: 'Insert into a B-tree',
        fn: 'btree_insert',
        params: ['root', 'value'],
        signature: 'function btree_insert(root, value)',
        brief: 'Insert a unique key into a valid B-tree of minimum degree 2 using top-down splits.',
        rules: ['Split a full node before descending into it. Promote its middle key. Split a full root first. Duplicate keys are a no-op. Keep the input unchanged.'],
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}, value: 25}},
        explanation: {
            approach: 'A new key always goes into a leaf, in its sorted place, and a node with 3 keys is full. A full node splits: `[a, b, c]` becomes `[a]` and `[c]`, and the middle key b moves up into the parent, between them. That needs room in the parent, so this version splits early, on the way down: any full node it is about to enter is split first, and so the parent it comes from is never full. This is top-down, or preemptive, splitting.\n\nThe steps: if the `value` is already in the tree, return the tree unchanged, before any split. A full root is split first: put it under a new empty root and split it there; this is the only way the tree gets taller. Then walk down: at each internal node take the slot i of the `value`, the index of the first key not smaller than it. If `children[i]` is full, split it, which puts its middle key at `keys[i]` here, and if the `value` is larger than that key, go to i + 1, the new right half. At the leaf, insert the `value` in sorted order.\n\nSplitting an internal node moves its children too: the first two stay with `[a]`, the last two go with `[c]`. To keep the input unchanged, work on a copy.',
            example: 'With `value` = 25: 25 is not in the tree. The root `[20]` has one key, not full, so there is no root split. Its slot for 25 is 1, past 20, and `children[1]`, `[30]`, has one key, not full, so the walk goes into it without a split. It is a leaf: 25 goes before 30, giving `[25, 30]`. The result is the root `[20]` with the children `[10]` and `[25, 30]`. Had the whole tree been the full leaf `[10, 20, 30]`, it would first split into `[20]` over `[10]` and `[30]`, and 25 would land in the same place.',
            cost: 'Time O(log n): one walk down, O(1) work at each node of at most 3 keys, and a split is O(1). Copying the whole tree to keep the input unchanged costs O(n) time and memory; copying only the nodes on the way down and the ones split keeps it O(log n).',
            pitfalls: [
                'Splitting on the way down and only then finding the `value` already there changes the shape of the tree for a duplicate; check for it first.',
                'Not going to i + 1 after a split puts the `value` in the left half: 25 into `[30]` over a full `[5, 10, 20]` must land in `[20, 25]`, not `[5, 25]`.',
                'Calling `splice` on the input’s `keys` and `children` changes the input; split a copy.',
            ],
        },
        sources: [
            {title: 'B-tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/B-tree#Insertion'},
            {title: '2–3–4 tree, Wikipedia', url: 'https://en.wikipedia.org/wiki/2%E2%80%933%E2%80%934_tree#Insertion'},
            {title: 'B-Tree Visualization, USFCA', url: 'https://www.cs.usfca.edu/~galles/visualization/BTree.html'},
        ],
        hints: ['Split [a, b, c] into [a] and [c], moving b up into their parent.'],
        observe: 'result',
        check: null,
        is_pure: true,
        from: ['Tree Lab'],
        solution: `function btree_insert(root, value)
{
    if (root === null) {
        return {keys: [value], children: []};
    }
    let out = structuredClone(root);
    if (has_key(out)) {
        return out;
    }
    if (out.keys.length === 3) {
        out = {keys: [], children: [out]};
        split_child(out, 0);
    }
    let current = out;
    while (current.children.length > 0) {
        let i = slot(current);
        if (current.children[i].keys.length === 3) {
            split_child(current, i);
            if (value > current.keys[i]) {
                ++i;
            }
        }
        current = current.children[i];
    }
    current.keys.splice(slot(current), 0, value);
    return out;
    function slot(current) {
        let i = 0;
        while ((i < current.keys.length) && (current.keys[i] < value)) {
            ++i;
        }
        return i;
    }
    function has_key(current) {
        while (current) {
            const i = slot(current);
            if (current.keys[i] === value) {
                return true;
            }
            current = current.children[i];
        }
        return false;
    }
    function split_child(parent, i) {
        const child = parent.children[i];
        const right = {keys: child.keys.splice(2), children: child.children.splice(2)};
        const key = child.keys.pop();
        parent.keys.splice(i, 0, key);
        parent.children.splice(i + 1, 0, right);
    }
}`,
        solution_php: `<?php

function btree_insert($root, $value)
{
    if ($root === null) {
        return (object) ['keys' => [$value], 'children' => []];
    }
    // a deep copy: new objects all the way down
    $out = json_decode(json_encode($root));
    if (btree_insert_has_key($out, $value)) {
        return $out;
    }
    if (count($out->keys) === 3) {
        $out = (object) ['keys' => [], 'children' => [$out]];
        btree_insert_split_child($out, 0);
    }
    $current = $out;
    while (count($current->children) > 0) {
        $i = btree_insert_slot($current, $value);
        if (count($current->children[$i]->keys) === 3) {
            btree_insert_split_child($current, $i);
            if ($value > $current->keys[$i]) {
                ++$i;
            }
        }
        $current = $current->children[$i];
    }
    array_splice($current->keys, btree_insert_slot($current, $value), 0, [$value]);
    return $out;
}

function btree_insert_slot($current, $value)
{
    $i = 0;
    while (($i < count($current->keys)) && ($current->keys[$i] < $value)) {
        ++$i;
    }
    return $i;
}

function btree_insert_has_key($current, $value)
{
    while ($current !== null) {
        $i = btree_insert_slot($current, $value);
        if (($i < count($current->keys)) && ($current->keys[$i] === $value)) {
            return true;
        }
        $current = $current->children[$i] ?? null;
    }
    return false;
}

function btree_insert_split_child($parent, $i)
{
    $child = $parent->children[$i];
    $right = (object) ['keys' => array_splice($child->keys, 2), 'children' => array_splice($child->children, 2)];
    $key = array_pop($child->keys);
    array_splice($parent->keys, $i, 0, [$key]);
    array_splice($parent->children, $i + 1, 0, [$right]);
}`,
        cases: [
            {label: 'Split a full root', args: [{keys: [10, 20, 30], children: []}, 25]},
            {label: 'Split a full child', args: [{keys: [30], children: [{keys: [5, 10, 20], children: []}, {keys: [40], children: []}]}, 7]},
            {label: 'No split needed', args: [{keys: [20, 40], children: [{keys: [5, 10], children: []}, {keys: [24, 32], children: []}, {keys: [50], children: []}]}, 25]},
            {label: 'Duplicate does not force a split', args: [{keys: [10, 20, 30], children: []}, 20]},
            {label: 'First key', args: [null, 0]},
        ],
    },
    {
        uid: 'items-missing-from-another-array',
        group: 'Arrays',
        level: 2,
        title: 'In one array, not in the other',
        fn: 'items_missing_from',
        params: ['a', 'b'],
        signature: 'function items_missing_from(a, b)',
        brief: 'Return the items of `a` that do not occur in `b`. The largest test holds 10,000,000 numbers in each array.',
        rules: ['Keep the order of `a`. An item that occurs in `a` several times and never in `b` comes out every time.', 'Items are compared with ===: the number 1 and the string \'1\' are different items.', 'Leave both arrays as they are.'],
        input: {text: 'Two arrays of numbers or strings; either may be empty. The largest test holds 10,000,000 whole numbers in each, from 0 to 9,999,999, at random.', example: {a: [5, 1, 4, 1, 3], b: [4, 1, 9]}},
        explanation: {
            approach: 'The task is a filter: keep each item of `a` for which the question "is it in `b`?" says no. All the cost is in that question. Asked by scanning `b`, with `b.includes(v)` or a loop, it takes up to m comparisons, m the length of `b`, and it is asked n times, n the length of `a`: n × m in all. For the largest test that is 10 million × 10 million = 10¹⁴ comparisons, more than a day at a billion a second, against a limit of 20 seconds. The nested scan is correct, and it passes the small tests; it only runs out of time on the big ones.\n\nA Set answers the same question in about one step, however many items it holds: it is a hash table, which finds an item by computing where it must be stored instead of comparing it with the others. So build `new Set(b)` once, m steps, then filter `a` with `has`, one step per item, n steps: 20 million steps in all, a few seconds. Databases call this a hash anti-join: a hash table of the NOT IN side, and one scan of the other. A Map does the same for keys that carry a value, as in Added, removed and changed rows.\n\n`filter` keeps the order of `a` and every repeat of a missing item, and a Set tells the number 1 from the string \'1\', as === does. Neither array changes.',
            example: 'a = [5, 1, 4, 1, 3] and b = [4, 1, 9]. The Set of b holds 4, 1 and 9. Filtering a: 5 is not in it, kept; 1 is, dropped; 4 is, dropped; the second 1 is dropped too; 3 is not in it, kept. The result is [5, 3], in the order of a.',
            cost: 'Time O(n + m) on average: m steps to build the Set and one lookup per item of `a`, where a scan of `b` per item is O(n × m), 10¹⁴ steps at 10 million each. Memory O(m) for the Set; a V8 Set holds at most 2²⁴, about 16.7 million, items, enough here, since the items run from 0 to 9,999,999.',
            pitfalls: [
                'Building the Set inside the callback, `a.filter(v => !new Set(b).has(v))`, builds it n times: n × m steps again, as slow as the scan.',
                'Sorting to compare with two pointers loses the order of `a`, which the result must keep, and `a.sort()` changes the argument, which the rules forbid.',
                'An object as the lookup, `seen[v] = true`, turns every key into a string: the number 1 and the string \'1\' become the same item.',
            ],
        },
        sources: [
            {title: 'Hash join: hash anti-join, Wikipedia', url: 'https://en.wikipedia.org/wiki/Hash_join#Hash_anti-join'},
            {title: 'Set, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'},
        ],
        hints: ['How many comparisons does `a.filter(v => !b.includes(v))` make when each array holds 10 million items?', 'A Set answers "is this value in it?" at once, however many values it holds.', 'Build the Set from `b` once, before the loop over `a`, not inside it.'],
        observe: 'result',
        check: null,
        is_pure: true,
        time_limit_ms: 20000,
        from: [],
        solution: `function items_missing_from(a, b)
{
    const items_in_b = new Set(b);
    return a.filter(v => !items_in_b.has(v));
}`,
        solution_php: null,
        php_note: 'its tests hold up to 10 million numbers in each array, made in JavaScript',
        cases: [
            {label: 'The example', args: [[5, 1, 4, 1, 3], [4, 1, 9]]},
            {label: 'Nothing in common', args: [[1, 2, 3], [4, 5, 6]]},
            {label: 'Every item of a is in b', args: [[2, 7, 2], [7, 2]]},
            {label: 'Empty a', args: [[], [1, 2]]},
            {label: 'Empty b', args: [[3, 1, 3], []]},
            {label: 'Both empty', args: [[], []]},
            {label: 'Repeats in a stay', args: [[8, 8, 1, 8], [1]]},
            {label: 'Repeats in b', args: [[1, 2, 3], [2, 2, 2]]},
            {label: 'Negative numbers and zero', args: [[-3, 0, 2, -1], [0, -1, 5]]},
            {label: 'Words', args: [['pear', 'apple', 'fig', 'plum'], ['fig', 'kiwi', 'apple']]},
            {label: 'A number and the same digits as text', args: [[1, '1', 2, '2'], ['1', 2]]},
            {label: '1,000 in each', args: [{$make: 'numbers', size: 1000, max: 1000, seed: 1}, {$make: 'numbers', size: 1000, max: 1000, seed: 2}]},
            {label: '100,000 in each', args: [{$make: 'numbers', size: 100000, max: 100000, seed: 3}, {$make: 'numbers', size: 100000, max: 100000, seed: 4}]},
            {label: '1,000,000 in each', args: [{$make: 'numbers', size: 1000000, max: 1000000, seed: 5}, {$make: 'numbers', size: 1000000, max: 1000000, seed: 6}]},
            {label: '10,000,000 in each', args: [{$make: 'numbers', size: 10000000, max: 10000000, seed: 7}, {$make: 'numbers', size: 10000000, max: 10000000, seed: 8}]},
        ],
    },
    {
        uid: 'rows-added-removed-changed',
        group: 'Arrays',
        level: 2,
        title: 'Added, removed and changed rows',
        fn: 'rows_diff',
        params: ['before', 'after'],
        signature: 'function rows_diff(before, after)',
        brief: 'Two versions of one table, `before` and `after`, each an array of rows with an `id`. Return `{added, removed, changed}`: the rows whose id only `after` has, the rows whose id only `before` has, and the rows of `after` that differ from the row of the same id in `before`. The largest test holds 1,000,000 rows in each.',
        rules: ['Rows are matched by `id`: each id occurs once in each array, and ids are compared with ===.', 'A row in both is changed when a field has another value, or is in one of its two versions only. Values are compared with ===: 5 and \'5\' differ. The order of the fields does not count.', '`added` and `changed` hold the rows of `after`, in the order of `after`; `removed` holds the rows of `before`, in the order of `before`.', 'Leave both arrays as they are.'],
        input: {text: 'Two arrays of rows, plain objects whose fields hold numbers, text, true, false or null; either array may be empty. The largest test holds 1,000,000 rows {id, name, price} in each, in a random order.', example: {before: [{id: 1, name: 'pear', price: 120}, {id: 2, name: 'fig', price: 300}, {id: 3, name: 'plum', price: 90}], after: [{id: 3, name: 'plum', price: 95}, {id: 1, name: 'pear', price: 120}, {id: 4, name: 'kiwi', price: 210}]}},
        explanation: {
            approach: 'This is the standard diff of two versions of a table by its key, what a sync between two databases computes: the added rows become INSERTs, the removed ones DELETEs, the changed ones UPDATEs. In SQL it is a FULL OUTER JOIN of the two versions on `id`: a row with a match on both sides is compared, a row of `after` with no match was added, a row of `before` with no match was removed.\n\nAll the cost is in one question, "which row of `before` has this id?", asked for every row of `after`. Answered with `before.find(v => v.id === row.id)`, it scans `before`: up to m steps, n times, n × m in all. For a million rows in each that is 10¹² steps, a quarter of an hour even at a billion a second, and `find`, with a callback per step, is several times slower, against a limit of 20 seconds. A Map from id to row answers it in about one step: it is a hash table, which finds a key by computing where it is stored. Databases join big tables the same way, with a hash join.\n\nSo put the rows of `before` into a Map by id, once. Then one pass over `after`: a row whose id the Map lacks is added, a row that differs from its old version is changed, the rest are the same; note each id in a Set as you go. A last pass over `before` keeps the rows whose id the Set lacks: the removed ones. About 3 million steps in all. Two versions of a row are the same when they have the same fields with === values, in any order.',
            example: 'The Map holds the rows 1, 2 and 3 of before. The pass over after: row 3 is in the Map, but its price is 95 where the old one has 90: changed. Row 1 is in the Map with the same name and price: the same. Row 4 is not in the Map: added. The Set of ids seen in after holds 3, 1 and 4, so the last pass over before keeps only row 2: removed. The result is {added: [row 4, kiwi], removed: [row 2, fig], changed: [row 3, plum at 95]}, each the row object itself.',
            cost: 'Time O(n + m) on average: one pass to build the Map, one over `after`, one over `before`, each lookup about one step, plus comparing the fields of each matched row once; a `find` per row is O(n × m), 10¹² steps at a million rows each. Memory O(n + m) for the Map and the Set of ids, well under the 2²⁴, about 16.7 million, entries a V8 Map or Set can hold.',
            pitfalls: [
                'Comparing rows with `JSON.stringify` makes the same fields in another order look changed: compare field by field, with ===.',
                'Checking only the fields of `after` misses a field that only `before` has: compare the number of fields as well, or the fields of both versions.',
                'Matching rows by position or by content instead of by `id` calls a reordered table all changed, and a row with every field but its id changed a remove plus an add.',
            ],
        },
        sources: [
            {title: 'Hash join: classic hash join, Wikipedia', url: 'https://en.wikipedia.org/wiki/Hash_join#Classic_hash_join'},
            {title: 'Map, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map'},
            {title: 'Set, MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set'},
        ],
        hints: ['How many steps does `before.find(v => v.id === row.id)` take for each of a million rows of `after`?', 'A Map from id to row answers "which row of before has this id?" at once.', 'The same fields in another order make the same row, so JSON.stringify will not do: compare field by field, the fields of both versions.'],
        observe: 'result',
        check: null,
        is_pure: true,
        time_limit_ms: 20000,
        from: [],
        solution: `function rows_diff(before, after)
{
    const rows_before = new Map(before.map(row => [row.id, row]));
    const ids_after = new Set();
    const added = [];
    const changed = [];
    for (const row of after) {
        ids_after.add(row.id);
        const row_before = rows_before.get(row.id);
        if (row_before === undefined) {
            added.push(row);
        }
        else if (!is_same_row(row_before, row)) {
            changed.push(row);
        }
    }
    const removed = before.filter(row => !ids_after.has(row.id));
    return {added, removed, changed};
}

function is_same_row(a, b)
{
    const keys = Object.keys(a);
    return (keys.length === Object.keys(b).length) && keys.every(key => Object.hasOwn(b, key) && (a[key] === b[key]));
}`,
        solution_php: null,
        php_note: 'its tests hold up to a million rows in each table, made in JavaScript',
        cases: [
            {label: 'The example', args: [[{id: 1, name: 'pear', price: 120}, {id: 2, name: 'fig', price: 300}, {id: 3, name: 'plum', price: 90}], [{id: 3, name: 'plum', price: 95}, {id: 1, name: 'pear', price: 120}, {id: 4, name: 'kiwi', price: 210}]]},
            {label: 'The same rows in another order', args: [[{id: 1, name: 'pear'}, {id: 2, name: 'fig'}, {id: 3, name: 'plum'}], [{id: 3, name: 'plum'}, {id: 1, name: 'pear'}, {id: 2, name: 'fig'}]]},
            {label: 'The same fields in another order', args: [[{id: 1, name: 'pear', price: 120}], [{price: 120, id: 1, name: 'pear'}]]},
            {label: 'Only added', args: [[{id: 1, title: 'Read'}], [{id: 1, title: 'Read'}, {id: 2, title: 'Write'}, {id: 3, title: 'Send'}]]},
            {label: 'Only removed', args: [[{id: 1, title: 'Read'}, {id: 2, title: 'Write'}, {id: 3, title: 'Send'}], [{id: 2, title: 'Write'}]]},
            {label: 'Every row changed', args: [[{id: 1, done: false}, {id: 2, done: false}], [{id: 2, done: true}, {id: 1, done: true}]]},
            {label: 'Empty before', args: [[], [{id: 5, name: 'Ann'}, {id: 6, name: 'Bob'}]]},
            {label: 'Empty after', args: [[{id: 5, name: 'Ann'}, {id: 6, name: 'Bob'}], []]},
            {label: 'Both empty', args: [[], []]},
            {label: 'Matched by id, not by content', args: [[{id: 1, name: 'pear'}], [{id: 2, name: 'pear'}]]},
            {label: 'A value set to null', args: [[{id: 7, email: 'ann@example.com'}], [{id: 7, email: null}]]},
            {label: 'A field only after has', args: [[{id: 5, name: 'Ann'}], [{id: 5, name: 'Ann', phone: '555-0100'}]]},
            {label: 'A field only before has', args: [[{id: 5, name: 'Ann', phone: '555-0100'}], [{id: 5, name: 'Ann'}]]},
            {label: 'The number 5 and the text \'5\'', args: [[{id: 1, qty: 5}, {id: 2, qty: '5'}], [{id: 1, qty: '5'}, {id: 2, qty: '5'}]]},
            {label: 'Text ids', args: [[{id: 'u-17', name: 'Ann'}, {id: 'u-4', name: 'Bob'}], [{id: 'u-4', name: 'Bob'}, {id: 'u-9', name: 'Eve'}]]},
            {label: '1,000 rows in each', args: [{$make: 'table', size: 1000, seed: 11, version: 'before'}, {$make: 'table', size: 1000, seed: 11, version: 'after'}]},
            {label: '100,000 rows in each', args: [{$make: 'table', size: 100000, seed: 12, version: 'before'}, {$make: 'table', size: 100000, seed: 12, version: 'after'}]},
            {label: '1,000,000 rows in each', args: [{$make: 'table', size: 1000000, seed: 13, version: 'before'}, {$make: 'table', size: 1000000, seed: 13, version: 'after'}]},
        ],
    },
];
