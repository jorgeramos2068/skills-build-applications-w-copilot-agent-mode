from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration with validation."""
    id = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'team']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value.strip()

    def validate_team(self, value):
        return value.strip()


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
