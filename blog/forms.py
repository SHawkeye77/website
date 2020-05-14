# This holds forms for the blog app

from django import forms

# Form needed to leave a comment on a blog post
class CommentForm(forms.Form):
    # Field for author of the comment
    author = forms.CharField(
        max_length=60,
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "placeholder": "Your Name"
        })
    )
    # Field for the actual body of the comment on the blog post
    body = forms.CharField(widget=forms.Textarea(
        attrs={
            "class": "form-control",
        "placeholder": "Leave a comment :)"
        })
    )
