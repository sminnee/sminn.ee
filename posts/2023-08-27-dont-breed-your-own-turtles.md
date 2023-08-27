---
title: Don’t breed your own turtles
date: 2023-08-27
---

### What did I learn this week?

I've recently been working on 2 sites with similar codebases:
[vCXO.directory](https://vcxo.directory) and [Astronort](https://astronort.com). They're both Vue on
the front-end, Express on the back-end, with a simple SQLite database. I have copy-pasted a lot of
code between them, and that started to feel sub-optimal. This week, I thought “screw it, I should
refactor the 2 sites to have a common library”.

After a collected ~6 hours attempting this over a few days, I decided it was the wrong thing to do
and gave up on it.

### Tilting at turtles

For many of my solo projects, I’ve taken a much more aggressive stance against pulling in libraries.
I’ve wanted to avoid ending up with the “stack of turtles” that so often plagues other projects:
dozens of libraries & tools pulled into a project to save time, that in the long-run result in a
fiddly & unmaintable mess.

In a project with tighter deadlines and a bigger team of varying skills, experience, and opinions,
it's usually easier to take the “sensible” path and make use of more off-the-shelf libraries. Solo
projects provide an opportunity to see what I can learn about the benefits & pitfalls of reinventing
a lot of small wheels.

As a rule-of-thumb, if it takes less than a day to build, my bet is that the overhead of dealing
with someone else’s mental model, and a solution that meets all use-cases, is probably greater than
the overhead of building a simpler solution suited precisely for the project I’m working on.

I've pushed this pretty far, building a lot of stuff that I might otherwise not need to, such as
simple content editing and authentication systems.

### Live long enough to see yourself become the villain

Separating code into a library caused a lot of friction.

First of all, details of the NPM/Vue/Vite ecosystem made running code in a separate package more
complicated for many small, tedious reasons. The moment that I table-flipped was when I realised
that the Vite plugin that lets me produce type definition files alongside my compiled library was
outputing a good fraction of my code with the "any" type.

Compiling a library, producing definition files via a plugin, and dealing with this bug in the
plugin were things that I didn't need to think about when all my code was in a repository. Although
it's certainly possible to produce well-designed libraries for others to use, there's a lot of work
beyond simply making the thing you want to re-use.

But beyond this “accidental complexity”, there were fundamental differences in the 2 sites, even in
areas that seemed identical between them. For example:

- My "generic" forms (log-in, reset password, etc) were styled differently in the 2 sites, where the
  design of each site led me to lay information out in a slightly different way.

- Each user database had slightly different fields, for linking to the rest of the data in the
  system.

Each of these problems could be solved in a library by introducing some appropriate abstractions.
But that makes the whole thing more complicated.

In addition, I noticed that on each site, I was finding opportunities to refactor code that was
achievable on a single project, but would become a lot harder to coordinate across 2 projects and a
shared library.

The sad truth is that in sharing code between, I was recreating the “stack of turtles” problem that
I had set out to avoid in the first place! But in this case, I wasn't benefitting from having
someone else maintain part of the solution.

It would be a worst-of-both-worlds scenario.

### It's like rain on my wedding day

After I dropped the idea of a shared library and went back to working on one of the sites in
isolation, copy/pasting some code from the other, the overwhelming feeling was one of relief.

The irony of all of this is that I spent more than a decade working on a complicated reusable
open-source web framework. I should have known all this.

Still, more than 20 years in, one of the things I love about software development is that it gives
me moments to feel like a stupid beginner learning the basics.
