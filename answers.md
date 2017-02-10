1. Notice anything new in our .gitignore? There are actually multiple .gitignore files in this project, can you find them all?

Yes, we did find them all. (.gitignore, client/.gitignore, server/.gitignore) The new things within
these gitignore files are couple yarn things, nohup.out, and node.

2. Note also that there are now multiple build.gradle files as well! Why is this?
 
Setting up different dependency paths. Build the client/server side of the project.

3. What are a couple of these new tools? What do you think they do?

Yarn runs on the client. Responsible for efficient dependency management. Caches every package it downloads, making it fast.

4. How does the navbar work in this project? Is our SparkJava server the only thing doing routing?

Each AppComponent has a <navbar-component> component. <navbar-component> is a custom component created
using typescript. The component is declared in angular within the AppModule class which gets Navbar from './app/navbar/navbar.component'.
When the component is included, if it has a "selector" within @Component, it will tie that component to "selector" as the HTML tag.

The client is routing as well as the server. Since Angular 2 apps have only one page, when
you go to a different pge within the browser the client needs to route you to the appropriate
part of the app.



