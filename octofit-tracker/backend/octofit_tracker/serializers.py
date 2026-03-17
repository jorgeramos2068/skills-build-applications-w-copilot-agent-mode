from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout

class UserSerializer(serializers.ModelSerializer):
    # Ensure Mongo ObjectId primary key is serialized as a string
    id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    # Ensure Mongo ObjectId primary key is serialized as a string
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Team
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    # Ensure Mongo ObjectId primary key is serialized as a string
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Activity
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    # Ensure Mongo ObjectId primary key is serialized as a string
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Leaderboard
        fields = '__all__'


class WorkoutSerializer(serializers.ModelSerializer):
    # Ensure Mongo ObjectId primary key is serialized as a string
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Workout
        fields = '__all__'
