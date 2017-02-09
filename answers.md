1. Notice anything new in our .gitignore? There are actually multiple .gitignore files in this project, can you find them all?

Yes, we did find them all. (.gitignore, client/.gitignore, server/.gitignore) The new things within
these gitignore files are couple yarn things, nohup.out, and node.

2. Note also that there are now multiple build.gradle files as well! Why is this?
 
Setting up different dependency paths. Build the client/server side of the project.

3. What are a couple of these new tools? What do you think they do?

Yarn runs on the client. Responsible for efficient dependency management. Caches every package it downloads, making it fast.

4. How does the navbar work in this project? Is our SparkJava server the only thing doing routing?

