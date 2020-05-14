from django.db import models

# Represents a category for blog posts
class Category(models.Model):
    name = models.CharField(max_length=20)

# Represents a post in the blog
class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    # ManyToMany() lets any number of categories be assigned to any number 
    #   of posts
    categories = models.ManyToManyField('Category', related_name='posts')

# Represent a comment on a post
class Comment(models.Model):
    author = models.CharField(max_length=60)
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    # Defining a many-to-one relationship where there can be many comments
    #   on a single post. First arg is the "one" in the many-to-one 
    #   relationship (the many is the current model being defined), the
    #   second arg defines what to do if first arg (the associated post, in
    #   this case) is deleted. Here, we just delete all comments associated
    #   with the deleted post. 
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
