# Practice

[src/practice.html](../src/practice.html) is a page of its own beside the
sandbox: tree and array algorithms to practise, one function at a time,
in JavaScript or PHP. It runs code the way the sandbox does: JavaScript in a
Worker, PHP in php-wasm, through the sandbox's own runner.

The sandbox's top bar has a **Practice** button that opens it, and its own
top bar a **Sandbox** button back, both in the same tab.

## The topics

The page opens on every topic, a card for each group in a colour of its
own, its topics with their solved marks and levels (green dots easy,
amber medium, red hard). Beside the title, **Continue** opens the topic
last opened, or **Start with** the first one on a first visit. Typing
anywhere outside a field goes to the search; Enter opens the first topic
it matches. The address says what is open, `practice.html#<topic>` or
`#history`, so a reload keeps it and the browser's Back goes to the
topics.

## A topic

A topic has three tabs, and **Topics** beside them goes back to every
topic. **Task** states the task and its input, draws the input's tree
beside it, and gives hints one at a time. **Solve** puts the editor beside the preview of one
test: the examples, the first three tests, then the others, each a numbered
chip in the colour of its result; the one picked shows the value expected
beside the one returned, then the tree it starts from. **Explanation** says
how the algorithm works and traces it on the example, with its cost, the
usual mistakes and links to read more where the topic has them, and holds
an example implementation in JavaScript, and in PHP where the input is
plain data. A new topic opens on Task, one with a draft on Solve.

Solve holds the editor and the preview alone, the topic's name beside its
tabs: its title and brief show on Task and Explanation.

**Run** (Ctrl Enter) tries the code on the examples and on the test shown,
and keeps nothing. **Submit** (Ctrl Shift Enter) runs every test: it goes
into the History, and a topic is solved once a Submit passes them all.

The tree topics came from two earlier pages, Tree Gym and Tree Lab: 91 of
them, in 13 groups, the tasks both pages had merged into one. The group
Arrays holds two topics on big data. The items of one array missing from
another, with up to 10,000,000 numbers in each: looking through the
second array for every item of the first runs out of time there, a Set
does not. The rows added, removed and changed between two versions of a
table, the diff a sync between two databases makes, with up to 1,000,000
rows in each: looking up each row with `find` runs out of time at
100,000, a Map by id does not. Their time limit is 20 s, where the others
have 4 s, and they are JavaScript only: their tests are made in
JavaScript, and the browser's PHP took 11 s over two arrays of 10 million
numbers, near its 15 s limit.

A case's time limit counts its attempt alone: it starts again once the
reference solution has given the expected value.

## Files

- [src/practice.html](../src/practice.html): the page.
- [src/practice/topics.js](../src/practice/topics.js): the topics, as data.
- [src/practice/engine.js](../src/practice/engine.js): the Worker that runs
  the code of a topic on its cases, beside its reference solution.

## Adding a case or a topic

A case is its args alone: `{label: 'A chain of three', args: [tree]}`.
Its expected value is what the topic's `solution` returns on the same
args, so a new case needs no expected value. The comment at the top of
`topics.js` says what each field of a topic means.

## Where the work is kept

In the browser's localStorage, on this device only: every draft, the
solved marks and every Submit, with its time, result and code (the History
tab). **Save all** writes all of it into one JSON file; **Load** brings
such a file back, in place of what is there, with an Undo.

Each Submit also writes its code into the sandbox's workspace Practice, a
folder for each group and a file for each topic and language, so the
sandbox opens it beside the other snippets. With that workspace open in
the sandbox at the same time, the sandbox's next save writes over the
newer file.
