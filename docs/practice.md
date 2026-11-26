# Practice

[src/practice.html](../src/practice.html) is a page of its own beside the
sandbox: tree algorithms to practise, one function at a time, in
JavaScript or PHP. It runs code the way the sandbox does: JavaScript in a
Worker, PHP in php-wasm, through the sandbox's own runner.

## A topic

Each topic explains its algorithm with a worked example, states the task
and its input, gives hints one at a time, and holds an example
implementation in JavaScript, and in PHP where the input is plain data.
Its tests draw the tree each one starts from, and show the expected value
beside the one returned. A topic is solved once every test passes.

The topics came from two earlier pages, Tree Gym and Tree Lab: 91 of them,
in 13 groups, the tasks both pages had merged into one.

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
solved marks and every run, with its time, result and code (the History
tab). **Save all** writes all of it into one JSON file; **Load** brings
such a file back, in place of what is there, with an Undo.

Each run also writes its code into the sandbox's workspace Practice, a
folder for each group and a file for each topic and language, so the
sandbox opens it beside the other snippets. With that workspace open in
the sandbox at the same time, the sandbox's next save writes over the
newer file.
