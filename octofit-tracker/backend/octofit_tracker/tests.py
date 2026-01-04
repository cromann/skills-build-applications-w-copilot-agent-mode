from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')
        self.ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        self.batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc)

    def test_user_team(self):
        self.assertEqual(self.ironman.team.name, 'Marvel')
        self.assertEqual(self.batman.team.name, 'DC')

    def test_activity_creation(self):
        activity = Activity.objects.create(user=self.ironman, type='Run', duration=30, calories=300)
        self.assertEqual(activity.user, self.ironman)
        self.assertEqual(activity.type, 'Run')

    def test_leaderboard(self):
        Leaderboard.objects.create(user=self.ironman, score=1000)
        entry = Leaderboard.objects.get(user=self.ironman)
        self.assertEqual(entry.score, 1000)

    def test_workout(self):
        workout = Workout.objects.create(name='Morning Cardio', description='Cardio', duration=40)
        self.assertEqual(workout.name, 'Morning Cardio')
