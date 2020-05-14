from django.contrib import admin
from blog.models import Post, Category

# Passing in the Post class so it can be accessed/altered by admin users
class PostAdmin(admin.ModelAdmin):
    pass

# Passing in the Category class so it can be accessed/altered by admin users
class CategoryAdmin(admin.ModelAdmin):
    pass

# Registering the created admin version of classes with the site
admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
