from django.db import models

# Create your models here.

class Users(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=500)
    age = models.IntegerField()
    rfc = models.CharField(max_length=500)
    photo = models.URLField(max_length=1000, blank=False, null=True)
    created_date = models.DateTimeField("date created")
    updated_date = models.DateTimeField("date updated")

    def __str__(self):
            return self.name

class Users_adress(models.Model):
    users_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    street = models.CharField(max_length=500)
    zip_code = models.IntegerField()
    city = models.CharField(max_length=200)
    country = models.CharField(max_length=200)
    created_date = models.DateTimeField("date created")
    updated_date = models.DateTimeField("date updated")

    def __str__(self):
        return self.city
