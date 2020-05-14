from django.shortcuts import render
from blog.models import Post, Comment
from .forms import CommentForm

# View for a list of all posts
def blog_index(request):
    # Obtaining a queryset of all posts in the database by creation date
    #   starting with the larges value (indicated by the minus sign)
    posts = Post.objects.all().order_by('-created_on')
    context = {
        "posts": posts,
    }
    return render(request, "blog_index.html", context)

# View for list of posts under a certain category
def blog_category(request, category):
    # Querying for all Post objects and filtering so we get only ones where
    #   the category is "category". Also, sorting by creation date.
    posts = Post.objects.filter(
        categories__name__contains=category
    ).order_by(
        '-created_on'
    )
    # Adding the filtered posts and category to our context dictionary
    context = {
        "category": category,
        "posts": posts
    }
    return render(request, "blog_category.html", context)

# View for a blog post in detail (including comments)
def blog_detail(request, pk):
    # Querying for a post with given pk
    post = Post.objects.get(pk=pk)
    

    # Instantiating a comment form (we made in ./forms)
    form = CommentForm()
    # If a comment is received (as a post request), save and add it
    if (request.method == "POST"):
        form = CommentForm(request.POST)
        # Making sure the form's fields have been filled in adequately
        if (form.is_valid()):
            # Creating a Django comment called "comment" with given data
            comment = Comment(
                author=form.cleaned_data["author"],
                body=form.cleaned_data["body"],
                post=post
            )
            # Saving the filled in comment
            comment.save()

    # Querying for all comments on given post
    comments = Comment.objects.filter(post=post)
    # Adding the post, associated comments, and needed form to contents dict
    contents = {
        "post" : post,
        "comments" : comments,
        "form": form,
    }
    
    return render(request, "post_detail.html", contents)

