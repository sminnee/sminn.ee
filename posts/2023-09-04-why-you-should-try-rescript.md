---
title: "Why you should try ReScript"
date: 2023-09-04
---

[ReScript](https://rescript-lang.org/) is a variant of OCaml with a syntax more famililar to
JavaScript developers. A couple of years ago I built [Forecastel](https://app.forecastel.com/) in
Rescript + React. More recently I’ve done most of my work in TypeScript I really enjoyed putting
together a ReScript project.

I don’t recommend that you drop everything and switch your current project to ReScript. However, if
you spend a lot of time doing TypeScript development, I think you should give ReScript a try on a
small project , because it will make you a better TypeScript programmer.

## What’s different from TypeScript

ReScript has a **sound** type system, which means that in a compilable program, the type of every
variable can be correctly inferred. To achieve this, it doesn’t attempt to replicate every feature
of JavasScript. Instead, it takes the OCaml type system and translates it to JavaScript.

TypeScript, on the other hand is explicitly a superset of JavaScript, and needs a more complex type
system in order to cover that functionality. As a result, TypeScript’s type system is **unsound**.
It’s commonplace in TypeScript code to assert type information in order to correct small mistakes
that the type checker has made.

The soundness of the type system means that there’s no type-coercion and no `any` or `unknown`
types. If the code compiles you can be much more confident that you won’t see runtime bugs.

(Technically, you _can_ build unsound escape hatches from the type system, when you link to
non-ReScript code, but this is a more deliberate step than simply tagging a variable as `any` in
TypeScript).

## What’s great about it

It’s hard to summarise the benefits of a language in a few short points, but 3 things that really
appeal to me are tagged unions, match expressions, and function chaining.

### Tagged unions

TypeScript has “algebraic types’ – the ability to create a union of tuple or record types into
arbitary and recursive structure. ReScript goes further with the “tagged union” type, where each
item in a union set has an **identifer** as well as 0 or more arguments. This is an elegant and
powerful way of specifying data structures.

For example, this specifies the abstract syntax free for a simple arithmetic expression:

```rescript
type rec expr =
  | OpAdd(expr, expr)
  | OpSub(expr, expr)
  | OpDiv(expr, expr)
  | OpMul(expr, expr)
  | OpPower(expr, expr)
  | Value(float)
```

And this specifies the action argument to Redux-style reducer for a simple to-do list. The
functionality normally provided by Redux’s “action creators” is essentially a core language feature.

```rescript
type id = string

type action =
  | Add(string)
  | Complete(id)
  | Modify(id, string)
  | Delete(id)
```

### Match expressions

Match expressions make it very easy to exhaustively and concisely operate on algebraic types. Here’s
an example evaluating the expression type above:

```rescript
let rec eval = (expr: extr) =>
  switch expr {
  | OpAdd(a, b) => eval(a) +. eval(b)
  | OpSub(a, b) => eval(a) -. eval(b)
  | OpDiv(a, b) => eval(a) /. eval(b)
  | OpMul(a, b) => eval(a) *. eval(b)
  | OpPower(a, b) => Js.Math.pow_float(~base=eval(a), ~exp=eval(b))
  | Value(val) => val
  }
```

You can nest expressions on the left to unpack deeper data-structures, and if you miss any of the
possible options, you will get a compile error.

### Function chaining

Function chaining via the `->` or `|>` operators makes it really easy to compose small,
single-purpose functions to get the result you want. A trivial example would be passing an input
string value into a `parse` function that generated the AST above, and then evaluated it into a
result variable:

```rescript
let result = inputValue->parse->eval
```

Essentially the `->` takes the result of the left-hand expression, and passes it as the first
argument of the function on the right.

```rescript
let a = parse(inputValue)
let result = eval(a)
```

The `|>` operator is similar but passes the result as the last argument instead.

## What’s frustrating about it

Despite its advantages, and the joy of using it (most of the time), it can be frustrating in ways
that you don’t really want from your team’s day-to-day tool. Because of this, and because TypeScript
provides enough of the benefits without these frustrations, I don’t necessarily recommend you jump
into with with a project supported by a large team.

### JSON parsing is painful

A lot of building websites involves parsing JSON structures. ReScript’s sound type system means you
won’t be caught out in the middle of your logic by invalid JSON data. However, this does mean that
you need code that checks each JSON payload and translates it into ReScript types.

When I worked with it, I ended up with a lot boilerplate for parsing & generating JSON messages for
each type. It was, strictly speaking, optional – you can coerce JSON payloads to/from ReScript types
outside the type system – but that seemed wrong and loses the benefits of the type system.

In principle, this could be solved with code generators, although I didn’t find anything suitable at
the time and I never bothered writing my own one.

### Small ecosystem

The ReScript ecosystem is very small. There aren’t a huge number of libraries for ReScript itself,
and if you want to pull in a 3rd party JavaScript package, you’ll probably find yourself writing the
type-signatures to map library into ReScript yourself. Generally people take the approach of writing
type-signatures only for the part of the library that they use, rather than relying on the
equivalent of `@types` packages in TypeScript.

The small ecosystem is made worse by the fact that there was some fracturing of ReScript and
sister/former projects Reason & BuckleScript, which means it’s not always obvious how older
libraries will fit with the code you’re currently working on.

If you’re dealing with an API with a very large API surface (e.g.
[WebGL](https://github.com/sminnee/temerity)), this can get tedious.

## Why will it make you a better TypeScript programmer?

So why try it? Because it will improve your ability to **think in types**.

By way of analogy, consider unit tests. Many people write unit tests, bashing something out after a
feature is done to get the coverage metric above an acceptable percentage. However, advocates of
Test-Driven Development know that tests aren’t just something to check you’re code: they’re a way of
encouraging you to think more deliberately about your code design, and that the act of writing tests
first improves the quality of your code.

So it is with types.

A language like ReScript makes it easier to:

- elegantly express your types
- make concise functions that transform between them
- chain together atomic functions to achieve the functional result you need

Because of this, it’s more natural to think of your application in terms of a set of types that
represent important states between them, and functions that transform between these types.

You might call it “Type-Driven Development”. It’s a great companion to Test-Driven Development –
transforming between types is very easy to unit test, and a lot of trivial tests are handled by the
type-checker.

It’s a useful mentality that you can carry back to your TypeScript code.
