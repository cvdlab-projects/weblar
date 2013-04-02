## Intructions for an easy and productive code developing

Every member has to do these little steps:

1) Open the git-bash and clone this repo.

	git clone git@github.com:cvdlab-bio/weblar.git

2) Enter the folder

	cd weblar
	
3) Create a branch with you name. This will be your personal branch in which you can do all your test freely.

	git branch name-surname
		
* for example: `git branch andrea-somma` (a random one, ndr).

4) Now you have your personal branch, let's go in it.

	git checkout name-surname
	
* to see all branch created: `git branch -l` or `git branch -v`
* now you should have an asterisk in front of your new branch

5) Then enter the folder in which there's the project you have to work in. All projects are divided in subfolders of `weblar/projects/`.

6) Do your work here. When you have a stable version of your code (new method ultimated, new snippet of code completed...), then call the Code Manager who will provide to merge it on the master branch.
