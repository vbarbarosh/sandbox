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
   when a topic has it, is how long the attempt on one case may run, once its reference has, in place of 4 s. */
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
        explanation: {approach: 'Every node contributes one. An empty tree contributes zero. Treat each child as the root of a smaller tree and add its count to the current node’s contribution.', example: 'A root with two leaf children has 3 nodes, even when all three values are equal.'},
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
        explanation: {approach: 'Use the shape of the count algorithm and change each node’s contribution from 1 to its value. All occurrences contribute, including zero and negative values.', example: 'A root valued 2 with children −7 and 5 returns 0.'},
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
        explanation: {approach: 'A node is a leaf exactly when its children array is empty. A node with children contributes the sum of the leaf counts in those subtrees.', example: 'A chain of four nodes has one leaf. A tree made of a single root has one leaf too.'},
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
        explanation: {approach: 'Each child gives you the height of one branch. Take the largest child height and add 1 for the current node. A leaf gives 1 because it has no child branches.', example: 'The path 8 → 3 → 6 → 4 contains four nodes and three edges. This exercise measures tree height in nodes, so the branching sample has height 4.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'Depth counts edges from the root to a node. To look one level farther down, descend into each child and reduce the remaining depth by one. At remaining depth zero, count just the current node.', example: 'A root with three children has one node at depth 0 and three nodes at depth 1.'},
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
        explanation: {approach: 'Each parent contributes one. Add the internal-node counts of each of its child subtrees.', example: 'A chain of four nodes contains three internal nodes and one leaf.'},
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
        explanation: {approach: 'Several nodes can share the same depth. Give each depth one counter and increment that counter once per visited node.', example: 'A root with six leaf children yields [1, 6].'},
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
        explanation: {approach: 'Process the current node before its children. Finish each child’s entire subtree before visiting the next sibling.', example: 'With root 5, children 2 and 8, and a child 1 under 2, preorder is [5, 2, 1, 8].'},
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
        explanation: {approach: 'Finish each child subtree from left to right. Append the current value after all the child calls return. This order lets a parent use results already computed for its children.', example: 'With root 5, children 2 and 8, and a child 1 under 2, postorder is [1, 2, 8, 5].'},
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
        explanation: {approach: 'Reading a children array backward skips the need to reverse the array itself.', example: 'For root 5 with children 2 and 8, and a child 1 under 2, the order is [5, 8, 2, 1].'},
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
        explanation: {approach: 'Group values by their depth. Reverse the outer array to place the deepest group first.', example: 'A root 5 with children 2 and 8 gives [[2, 8], [5]].'},
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
        explanation: {approach: 'A leaf is a node whose children array is empty. Walk the tree in preorder and push the uid of each leaf you meet; preorder reaches them from left to right.', example: 'The bushy tree has the leaves d, h, i, f and g. A tree of one node is its own only leaf: [a].'},
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
        explanation: {approach: 'Process nodes in first-in, first-out order. Queue the root first. As you visit a node, append its children in array order. A read index lets you keep the queue order without removing elements from the front.', example: 'With root 5, children 2 and 8, and a child 1 under 2, breadth-first order is [5, 2, 8, 1].'},
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
        explanation: {approach: 'Keep your traversal queue in normal order. Reverse only the collected values on alternating levels.', example: 'For root 8 with children 3, 10, and 14, the second output level is [14, 10, 3].'},
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
        explanation: {approach: 'The enter and exit events enclose exactly the events for that node’s descendants.', example: 'A leaf with value 7 gives [["enter", 7], ["exit", 7]].'},
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
        explanation: {approach: 'Walk the tree in preorder and carry the depth down as an argument. The group of a depth is made the first time a node of that depth is met; every later node of that depth is pushed into it. Preorder meets the nodes of each level from left to right, so every group comes out in order without a queue.', example: 'In the bushy tree (a → b, c, g; b → d, e; e → h, i; c → f) the groups are [[a], [b, c, g], [d, e, f], [h, i]].'},
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
        explanation: {approach: 'Replace the call stack with an array of your own. Start with [root]; pop a node, push its uid, then push its children in reverse order, so the leftmost child is the next to be popped. A chain 100,000 nodes deep then costs memory, not stack frames.', example: 'For a with the children b and c: pop a, push c and b; pop b; pop c. The walk is [a, b, c].'},
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
        explanation: {approach: 'A generator yields one node at a time and does nothing while the caller does not ask. Yield the root, then hand over to the generator of each child with yield*. Collecting the nodes into an array first and returning it is not lazy.', example: 'A for...of over tree_iterate(root) that breaks at e reads only a, b, d and e of the bushy tree.'},
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
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {approach: 'Check the node itself first, then ask each child subtree in turn. The first subtree that answers with a node ends the search: return that answer at once. Return the node object itself, not a copy, so the caller can change the tree through it.', example: 'Searching the bushy tree for e returns the node e, with h and i still under it. Searching for zz returns null.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'A path is the chain of ancestors ending at the match. Visit nodes in preorder so that you stop at the correct match when values repeat. If a subtree finds a match, include the current node as you return up the chain.', example: 'If 8 has children 9 and 0, and 9 also has child 0, searching for 0 returns [8, 9, 0]. That 0 is visited first.'},
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
            {label: 'A uid that is not there', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, -1]},
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
        explanation: {approach: 'Keep a working path for the current branch. Push a value when entering, save a copy at each leaf, and pop when leaving. Each copy stays independent as the search moves to a different branch.', example: 'A root 5 with two leaf children valued 2 returns [[5, 2], [5, 2]]. Both leaves are included.'},
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
        explanation: {approach: 'A node adds its value to the best path sum among its children. A leaf supplies its own value.', example: 'With root −4 and leaf children −10 and −2, the best root-to-leaf sum is −6.'},
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
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {approach: 'Look one level ahead: a node is the answer when one of its children has the uid. Check the uid of each child before recursing into it. The root has no parent, so its uid returns null, as a missing uid does.', example: 'In the bushy tree the parent of h is e and the parent of b is a; the root a has none: null.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'Compare the paths from the root to both targets. Their shared prefix contains all common ancestors. Its last node is deepest. Check that both paths exist before looking for their shared prefix.', example: 'For paths [8, 3, 6, 4] and [8, 3, 6, 7], the common prefix ends at 6. For targets 3 and 7, it ends at 3.'},
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
            {label: 'The same uid twice', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 7, 7]},
            {label: 'One uid is not there', args: [{value: 1, children: [{value: 2, children: [{value: 4, children: []}, {value: 5, children: [{value: 8, children: []}, {value: 9, children: []}]}]}, {value: 3, children: [{value: 6, children: []}]}, {value: 7, children: []}]}, 8, -1]},
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
        explanation: {approach: 'Decide bottom-up. Filter the children first; a node stays when it matches, or when any of its children stayed. A kept node is a copy, {...node, children: kept}, so the input tree stays as it was.', example: 'Filtering a project tree for .js files keeps every .js file and the folders on the way to it. The docs folder holds no .js file, so it goes with everything in it.'},
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
        explanation: {approach: 'A copy of a tree is a copy of its root whose children are copies of the original children. Spread the own fields of the node, then replace children with the clones. No object of the result may be an object of the input.', example: 'Renaming a node in the clone of the bushy tree leaves the original as it was.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'Create an output node for each input node. Multiply its value and transform the children in the original order. Keeping the same shape matters even when the factor is zero.', example: 'For root 6 with children −2 and 1, multiplying by 0.5 gives root 3 with children −1 and 0.5.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'Decide whether a node survives before visiting its children. Dropping a node removes its entire subtree. A value equal to the threshold survives.', example: 'If 10 has children 4 and 7 and 4 has child 99, a threshold of 5 leaves 10 and 7. The value 99 disappears with its parent.'},
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
            {label: 'Thirty nodes, at least 20', args: [{value: -5, children: [{value: -18, children: [{value: 6, children: [{value: -21, children: [{value: 88, children: [{value: 82, children: []}, {value: 6, children: []}, {value: 12, children: []}]}, {value: 20, children: [{value: 96, children: [{value: 35, children: [{value: 3, children: [{value: -5, children: []}]}]}]}, {value: 35, children: []}]}, {value: 28, children: []}, {value: -23, children: [{value: 82, children: []}, {value: 22, children: []}]}]}, {value: 85, children: []}, {value: 13, children: [{value: 71, children: []}]}]}, {value: -3, children: [{value: -11, children: []}]}]}, {value: -36, children: [{value: 8, children: [{value: -21, children: []}, {value: -31, children: []}]}, {value: 65, children: []}, {value: -3, children: []}]}, {value: 73, children: []}]}, 20]},
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
        explanation: {approach: 'Check the input node for children before transforming it. An original leaf contributes null. An original parent can survive with an empty children array when all of its children are removed.', example: 'The chain 9 → 5 → 2 → 0 becomes 9 → 5 → 2. The node 2 survives even though it becomes a leaf.'},
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
        explanation: {approach: 'Visit each child recursively to sort its descendants. Then sort the new children array by numeric value. Returning zero for equal values lets the stable sort keep their original order.', example: 'Siblings with values 10, −9, 2, and 0 become −9, 0, 2, and 10. Any grandchildren are sorted within their own parent.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'Each call on a child gets one less level of space. Rebuild only the branches that fit.', example: 'A limit of zero keeps a copy of the root alone.'},
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
        explanation: {approach: 'Call fn(node, depth) once for every node; what it returns becomes the new node, and you add children to it: the mapped children of the original node. The depth flows down: the root has 0, its children 1.', example: 'With fn = (node, depth) => ({uid: node.uid, depth}) the root becomes {uid: a, depth: 0, children: […]}, and h, three levels under it, gets depth 3.'},
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
        explanation: {approach: 'A folder needs the totals of its children before its own: a postorder job. Let the helper return the total of its subtree, the own size of the node or 0 plus what its children return, and store it under the uid of the node on the way back up.', example: 'In the project tree the folder tree holds walk.js (180) and find.js (95): 275. Its parent src adds app.js (420) and index.html (60): 755. An empty folder reports 0.'},
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
        explanation: {approach: 'A subtree consists of a node and all of its descendants. Compute child results before computing the parent. Each transformed child already contains the sum for that whole branch.', example: 'A root valued 2 with leaf children 3 and 5 becomes a root valued 10 with the same two leaf values.'},
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
        input: {text: 'A node stores a numeric value and an ordered children array. A leaf has an empty children array. A null root represents an empty tree.', example: {root: {value: 5, children: [{value: 2, children: []}, {value: 8, children: []}]}}},
        explanation: {approach: 'For a matching node, concatenate the transformed children and return them directly. For any other node, put the transformed children back under one node.', example: 'With root 8 and children 3 and 9, where 3 has children 1 and 2, removing 3 gives 8 with children 1, 2, and 9.'},
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
        explanation: {approach: 'Pass a prefix down the recursion. The line of a child is the prefix, then ├── , or └── for a last child, then its uid. For the lines below that child the prefix grows by │ and three spaces when more siblings follow it, and by four spaces when it was the last one.', example: 'a with the children b and c, and d under b, prints:\na\n├── b\n│   └── d\n└── c'},
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
        explanation: {approach: 'The depth of a line is its number of leading spaces divided by two. The parent of a line is the latest line one level shallower, so keep a stack where stack[depth] holds the latest node at that depth: push the new node into stack[depth - 1].children, then put it at stack[depth]. Skip blank lines.', example: 'The lines a, "  b", "    c" and "  d" make a with the children b and d, and c under b.'},
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
        explanation: {approach: 'Find the parent by its uid, the search you already wrote, then put the node into its children at the index with splice(index, 0, node). An index that is undefined, or past the end, appends. A missing parent changes nothing and returns false.', example: 'Inserting x into c at index 0 makes the children of c x and f. Inserting into zz returns false and leaves the tree as it was.'},
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
        input: {text: 'Every node is a plain object {uid, children}: uid is a string, children an ordered array. A leaf has children: [].', example: {root: {uid: 'a', children: [{uid: 'b', children: []}, {uid: 'c', children: []}]}}},
        explanation: {approach: 'Removing needs the parent and the position of the node among its siblings, so look at the children from the side of the parent: loop over them with an index, splice the match out and return it, else recurse into the child. The root has no parent, so it cannot be removed: null.', example: 'Removing e from the bushy tree returns e with h and i still under it; b keeps d alone.'},
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
        explanation: {approach: 'Check everything before touching the tree: both uids are there, the node is not the root, and the target is neither the node itself nor inside its subtree; otherwise return false. Then detach the node from its parent and splice it into the children of the target. The index counts after the detach.', example: 'Moving h into c at index 0 gives c the children h and f. Moving b into e returns false: e lies under b.'},
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
        explanation: {approach: 'Use a lookup to create one output node per ID. Then iterate over the original rows again and attach each node to its parent or the root list. The second pass preserves sibling and root order.', example: 'Rows for child → parent and parent → null produce one root, parent, with child under it, even when the child row appears first.'},
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
        explanation: {approach: 'Visit the roots and each set of children in array order. Emit a row as soon as you reach a node, using the parent ID from the recursive call. At the start of each root, use null.', example: 'For roots A and B, where A has children X and Y, the output row order is A, X, Y, B. X and Y carry parent_id A.'},
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
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}]}},
        explanation: {approach: 'Compare the ID before adding it to the path. Use null for a result that means the target was absent in this branch.', example: 'For app → src → index.js, finding the ancestors of index.js returns ["app", "src"].'},
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
        explanation: {approach: 'Walk in preorder and push one row as each node is reached. Neither the uid of the parent nor the depth is stored in a node, so pass both down the walk as arguments: the root gets null and 0, its children the uid of the root and 1.', example: 'The chain a → b → c → d gives the rows {a, null, 0}, {b, a, 1}, {c, b, 2} and {d, c, 3}.'},
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
        explanation: {approach: 'Two passes. First make a node for every row and keep it in a lookup by uid. Then go over the rows again, in their order, and push each node into the children of its parent, found in the lookup; the row whose parent_uid is null is the root. Each pass is O(n).', example: 'The rows c → a, a → null, b → a give the root a with the children c and b, in that order, though c comes before a.'},
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
        explanation: {approach: 'Preorder determines where each row goes. Subtree sizes become available after the children have been visited. Append the row on entry, then fill its size while the recursive calls return.', example: 'A root A with child B and a separate root C yields sizes A = 2, B = 1, C = 1, in that order.'},
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
        input: {text: 'A forest is an ordered array of root nodes. Each node has a string id and an ordered children array. Even a leaf carries children: [].', example: {roots: [{id: 'parent', children: [{id: 'child', children: []}]}]}},
        explanation: {approach: 'Walk from the destination back toward its root before moving. If that route reaches the moved node, the move would create a cycle. Make the move on a copy.', example: 'With root app containing src and a separate root docs, moving src under docs removes it from app and appends it to docs.'},
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
        explanation: {approach: 'Set root.parent = null, then walk down: in the loop of each node over its children, where both objects are at hand, set child.parent = node, then recurse into the child. Overwrite whatever parent held before.', example: 'After the call, h of the bushy tree points at e, e at b, b at a, and a at null.'},
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
            {label: 'Stale links from before an edit', args: [{uid: 'a', children: [{uid: 'b', children: [{uid: 'd', children: []}, {uid: 'e', children: [{uid: 'h', children: []}, {uid: 'i', children: []}]}]}, {uid: 'c', children: [{uid: 'f', children: []}]}, {uid: 'g', children: []}]}]},
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
        explanation: {approach: 'The next node in preorder is the first child, when there are children. Otherwise it is the next sibling; with none, climb to the parent and try its next sibling, and keep climbing. Running out of parents means the walk is over: null.', example: 'In the bushy tree the node after b is d, after d it is e, after i it is c (climbing past e and b), and after g it is null.'},
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
        explanation: {approach: 'A first child is preceded by its parent. Any other node is preceded by the last node of the subtree of its previous sibling: from that sibling, keep taking the last child until you reach a leaf. The root has no previous node: null.', example: 'In the bushy tree the node before c is i, the last node under b; before b it is a; before a it is null.'},
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
        explanation: {approach: 'y is the depth: it flows down as an argument. x flows up: leaves take 0, 1, 2… from left to right from a counter kept outside the helper, and a parent, set after its children, sits halfway between its first and its last child.', example: 'The leaves d, h, i, f and g of the bushy tree get x from 0 to 4; e sits at 1.5, between h and i, and b at (0 + 1.5)/2 = 0.75.'},
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
        explanation: {approach: 'Reverse the left and right branches independently at every node. Recursively invert both branches before putting them in their new positions.', example: 'A root with only a left child gets only a right child. If that child had a right child of its own, the grandchild moves to its left.'},
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
        explanation: {approach: 'Work from the leaves up. Each helper call returns either the subtree height or a sentinel for an unbalanced subtree. Even if the root’s two branch heights match, a deeper node can make the tree unbalanced.', example: 'A node with one leaf child is balanced. Add a grandchild on that same side and its two heights become 2 and 0.'},
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
        explanation: {approach: 'Pair the left side’s left child with the right side’s right child and vice versa. A missing branch matches only another missing branch.', example: 'Two equal-valued children are insufficient if one has a grandchild in the wrong position.'},
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
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {approach: 'Walk left using a stack, then consume the nearest unvisited node and continue to its right. Count only when emitting a node.', example: 'For the values 1, 3, and 7, k = 2 returns 3.'},
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
        explanation: {approach: 'Carry the allowed numeric interval down each branch. A left child inherits the current value as its upper bound, and a right child inherits it as its lower bound. Both bounds are exclusive.', example: 'With root 8 and right child 12, a left child 7 under 12 breaks the rule. It is below 12, but every node on that side of 8 must be above 8.'},
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
        explanation: {approach: 'At each node, consider the longest path that goes through that node. Its length is the sum of the arm lengths down the left and right sides. Keep the largest candidate found anywhere in the tree.', example: 'If each arm goes two edges down from the root, a path between their endpoints has length 4 edges. A single node has diameter 0.'},
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
        explanation: {approach: 'Traverse the left branch, emit the current value, then traverse the right branch. Inorder gives ascending values for a valid binary search tree. Other binary trees may yield unsorted values.', example: 'A root 2 with no left child and right child 1 gives [2, 1].'},
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
        explanation: {approach: 'The preorder position of a parent is before both branches. An explicit stack can simulate the recursive calls.', example: 'For root 2 with children 1 and 3, the result is [2, 1, 3].'},
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
        explanation: {approach: 'Postorder is useful when a parent depends on both completed child results.', example: 'For root 2 with children 1 and 3, the result is [1, 3, 2].'},
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
        explanation: {approach: 'Breadth-first search visits nearer nodes first. Tracking an index avoids shifting the queue.', example: 'For root 5 with children 2 and 8, and child 1 under 2, the result is [5, 2, 8, 1].'},
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
        explanation: {approach: 'Visiting right first gives descending values for a valid BST. For a general binary tree, keep the exact right, root, left order.', example: 'For a root 2 with left 1 and right 3, the order is [3, 2, 1].'},
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
        explanation: {approach: 'Queue order gives depth order within each group. Sort the column keys numerically when producing the result.', example: 'The nodes reached by left → right and right → left share column 0. At equal depth, left → right comes first.'},
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
        explanation: {approach: 'Keep the same index for right children. Increase it for left children and append each visited value to its group.', example: 'The rightmost chain beginning at the root lies entirely on diagonal 0.'},
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
        explanation: {approach: 'A left-first DFS reaches the leftmost existing node before any other node at the same depth. Store the first value for each depth.', example: 'When the left subtree ends early, a deeper node from the right subtree can enter the view.'},
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
        explanation: {approach: 'The visible node is the first existing node found at that depth when searching right before left.', example: 'When the right subtree ends early, a deeper node from the left subtree can enter the view.'},
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
        explanation: {approach: 'Changing the order of queue insertion would also change which children are visited first next level. Reverse the finished value list instead.', example: 'For root 2 with children 1 and 3, return [[2], [3, 1]].'},
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
        explanation: {approach: 'Breadth-first order encounters nearer nodes before deeper ones. Record only the first value for each column.', example: 'In column 0, the root obscures every node below it.'},
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
        explanation: {approach: 'A breadth-first walk moves from shallower to deeper nodes. Replacing the entry in each column keeps the deepest one and applies the tie rule.', example: 'If left → right and right → left reach different nodes at the same depth, right → left wins their shared column.'},
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
        explanation: {approach: 'On the first visit, thread the predecessor back to the current node and descend left. On the second, remove the thread, emit the node, and go right.', example: 'In the tree 2 with children 1 and 3, temporarily point 1.right back to 2. Remove that thread when returning to 2.'},
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
        explanation: {approach: 'Follow the outer child if possible on each side. Exclude leaves from the two boundary walks because the middle pass already collects them.', example: 'Root 1 with children 2 and 3 has boundary [1, 2, 3].'},
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
        explanation: {approach: 'Enter each directory in list order. Append the name to build the next path. Emit a path only when you reach a file.', example: 'Under the root, src/index.js is listed as /src/index.js.'},
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
        explanation: {approach: 'Files supply their stored size. Directories themselves have no direct size in this model, so total their children recursively.', example: 'A folder with a 12-byte file and a subfolder containing an 8-byte file totals 20 bytes.'},
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
        explanation: {approach: 'A directory counts only when its own child list is empty. A zero-byte file is still a child.', example: 'If /parent contains /parent/leaf and the leaf is empty, list only /parent/leaf.'},
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
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {approach: 'Walk the ordered directory children until you find a matching name. Continue with the next segment only if the entry is a directory.', example: 'The path /docs/index.js finds index.js under docs, even if src has its own index.js.'},
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
        explanation: {approach: 'Start with no candidate. Visit files in their original order and update the best file as you go.', example: 'Two 8-byte files tie. If /a appears before /b, return {path: "/a", size: 8}.'},
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
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {approach: 'Test filenames only when the entry is a file. Skip candidates that have no characters on one side of their final dot.', example: 'archive.tar.gz has extension gz. .gitignore has no extension. .env.local has extension local.'},
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
        explanation: {approach: 'This combines preorder output with a postorder total. The row keeps its place while the nested calls compute the byte sum.', example: 'If /src contains an 8-byte file and / has a 12-byte file alongside src, the rows are / = 20 and /src = 8.'},
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
        input: {text: 'A directory has name, type "directory", and a children array. A file has name, type "file", and a nonnegative byte size. Sibling names are unique. Root paths start at /. An empty tree has a null root.', example: {root: {name: 'work', type: 'directory', children: [{name: 'src', type: 'directory', children: [{name: 'index.js', type: 'file', size: 12}]}, {name: 'readme.md', type: 'file', size: 4}]}}},
        explanation: {approach: 'Work on a copy. Match every segment exactly and reject a rename that would create two equal names within one directory. A folder’s contents are carried with it.', example: 'Renaming /src to lib gives /lib/index.js in place of /src/index.js, with the same file size.'},
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
        explanation: {approach: 'Move the pivot’s left subtree to the old root’s right, then put the old root on the pivot’s left. Inorder stays the same.', example: 'With 10 → right 30, and 30 → left 20, the new root is 30 and 20 becomes the right child of 10.'},
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
        explanation: {approach: 'Move the pivot’s right subtree to the old root’s left. Put the old root on the pivot’s right.', example: 'With 30 → left 10, and 10 → right 20, the new root is 10 and 20 becomes the left child of 30.'},
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
        explanation: {approach: 'If the heavy child leans toward the inside, rotate that child first. Rotate the root toward the lighter side.', example: 'For 30 with left child 10 and 10’s right child 20, turn left at 10 and then right at 30. The resulting root is 20.'},
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
        input: {text: 'A node stores a numeric value and explicit left and right branches. Use null for each absent branch. The left and right positions matter even if one side is empty.', example: {root: {value: 5, left: null, right: {value: 8, left: null, right: null}}}},
        explanation: {approach: 'After inserting into a child, determine whether the current node needs a left or right rotation. The heavy child’s own balance determines whether to rotate it first.', example: 'Inserting 20 into root 30 with left child 10 triggers a left-right rotation and yields root 20.'},
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
        explanation: {approach: 'A red node can have a black child. Report only red-to-red edges, and continue looking inside every subtree.', example: 'If a red node 10 has red children 5 and 15, the output starts with [10, 5], then [10, 15].'},
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
        explanation: {approach: 'Black height is a uniform-path condition. A branch ending at a null child has a count of zero before adding actual nodes.', example: 'A black root with a red leaf on one side and no child on the other has black height 1.'},
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
        explanation: {approach: 'Validate each key against all ancestors by keeping bounds. Reject a red child of a red node. Make sure the black counts from both children match.', example: 'A black root with two red children is valid when they are ordered correctly and both are leaves.'},
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
        input: {text: 'Use value, color, left, and right. Color is either "red" or "black". A missing branch is null. Missing branches add zero when counting actual black nodes.', example: {root: {value: 4, color: 'black', left: {value: 2, color: 'red', left: null, right: null}, right: null}}},
        explanation: {approach: 'Rotations transfer the old root color to the promoted node and color the demoted node red. Color flips toggle the parent and its two children.', example: 'Inserting 6 into black 4 with a red left child 2 creates two red children. The color flip and root recoloring leave all three nodes black.'},
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
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}}},
        explanation: {approach: 'If that key equals the target, you found it. Otherwise its index is the child slot that can still contain the target.', example: 'With root keys [20, 40], target 24 can only be in the middle child.'},
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
        explanation: {approach: 'Alternate child and key visits until the keys run out. A leaf contributes just its keys.', example: 'Root [20, 40] and leaf children [10], [30], [50] yield [10, 20, 30, 40, 50].'},
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
        explanation: {approach: 'Each key subdivides the allowed range. A child between two keys must lie strictly between them, also respecting every ancestor.', example: 'With root [20, 40], its middle child cannot hold 40 or 50. A valid child could hold [24, 32].'},
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
        input: {text: 'Each node has a sorted keys array and a children array. For minimum degree 2, a valid node has one to three keys and either no children or one more child than there are keys. Null represents the empty tree.', example: {root: {keys: [20], children: [{keys: [10], children: []}, {keys: [30], children: []}]}}},
        explanation: {approach: 'Once the parent has room, it can accept the promoted key and a new child slot. Choose the descent direction again after splitting.', example: 'Inserting 25 into the leaf [10, 20, 30] yields root [20] with children [10] and [25, 30].'},
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
        explanation: {approach: 'Looking through all of `b` for each item of `a` costs n × m comparisons: for two arrays of 10 million, 10¹⁴, more than a day at a billion a second. Put the items of `b` into a Set once, m steps; then each item of `a` is one lookup, n steps: 20 million steps in all, a second or two.', example: 'a = [5, 1, 4, 1, 3] and b = [4, 1, 9]: the Set holds 4, 1 and 9; of the items of a, 5 and 3 are not in it, so the result is [5, 3].'},
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
        explanation: {approach: 'The standard diff of two versions of a table by its key, what a sync between two databases makes: the added rows become INSERTs, the removed ones DELETEs, the changed ones UPDATEs; in SQL it is a FULL OUTER JOIN on id. Looking for each row of `after` in `before` with `find` costs n × m steps: for a million rows in each, 10¹², hours. Put the rows of `before` into a Map by id once; then one pass over `after` finds the old version of each row at once, so each row is new, changed or the same, and the ids seen there leave in `before` the removed ones: about 3 million steps in all.', example: 'The Map holds rows 1, 2 and 3 of before. Row 3 of after has the price 95 where before had 90: changed. Row 1 is the same. Row 4 is not in the Map: added. Row 2 never comes up in after: removed. The result is {added: [row 4], removed: [row 2], changed: [row 3 with 95]}.'},
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
