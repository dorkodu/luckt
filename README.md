![Luckt Logo](assets/luckt-logo-dark.png)

# Luckt

Luckt is a lightweight and predictable state management pattern + library for JavaScript apps. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable way. 

You can use Luckt together with [Lucid](https://github.com/dorkodu/lucid), or with any other view library.

Learn more about Luckt and get started by checking out the documentation.

> ### NOTICE
>
> Luckt is still under development. We are working to make it better. <br>We haven't released anything, yet. Wait until we come!

## Get Started

Luckt is a lightweight library with a single source file. It is tiny (less than 4kB) and simple to use. You even don't need to be using npm! Luckt is a single file, you can easily add the minified version to your code. Download it from the Luckt docs site, or the file named **luckt.min.js** in the GitHub repo.

**Luckt documentation** is our official recommended approach for starting to learn Luckt. It wraps around the whole "for Dummies" content, philosophy behind it, installation, deep dive into Luckt's core. By reading the docs, you learn how to use Luckt with our suggested best practices, see the simple logic behind Luckt.

## Documentation

The Luckt docs are located at **https://libre.dorkodu.com/luckt**.

If you want a PDF for offline reading, please look at the resources folder.

## Stay In Touch

For latest releases and announcements, follow on Twitter: [@dorkodu](https://twitter.com/dorkodu).

## Before Diving Deeper

Luckt is a valuable pattern for organizing and managing your state, but you should also consider whether it's appropriate for your situation.

Here are some suggestions on when it makes sense to use Luckt:

- You have reasonable amounts of data changing over time
- You need a single source of truth for your application state
- You find that managing all your state manually is no longer sufficient

Yes, these guidelines are subjective and vague, but this is for a good reason. The point at which you should integrate Luckt into your application is different for every user and different for every application.

## The Story

**Doruk Eray** *(author of Luckt - also the founder of **Dorkodu**)* wrote Luckt while working on a new approach to designing software architecture for user-facing apps, called [**the Lucid approach**](https://github.com/dorkodu/lucid), with **Berk**, the developer of **Lucid.js**. Doruk's goal was to create a minimalistic state management library with a simple API but completely predictable behavior. Luckt makes it possible to track changes in your application state.

## Influences

Luckt evolves the ideas of Redux, but avoids complexity by borrowing principles from [the Lucid Approach](https://libre.dorkodu.com/the-lucid-approach/)
Even if you haven't used any other state manager libraries, Luckt only takes a few minutes to get started with.

## Change Log

This project adheres to [Semantic Versioning](https://semver.org/).<br>Detailed changes along the way are documented in the [change log notes](CHANGELOG.md).

## License

[MIT](LICENSE)

*Copyright (c) 2020-present Dorkodu*

