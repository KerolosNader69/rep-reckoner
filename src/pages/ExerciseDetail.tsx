import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Maximize, Repeat, ThumbsUp, Save, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const exercisesData = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "gRVjAtPip0Y",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Unrack the bar and lower it to your mid-chest.",
      "Press the bar back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your wrists straight and elbows at a 45-degree angle from your body.",
      "Maintain a natural arch in your lower back.",
      "Don't bounce the bar off your chest.",
      "Keep your shoulders back and down throughout the movement."
    ]
  },
  {
    id: 2,
    name: "Pull-ups",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "XB_7En-zf_M",
    instructions: [
      "Hang from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width.",
      "Pull your body up until your chin is over the bar.",
      "Lower your body back to the starting position with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Engage your core throughout the movement.",
      "Don't swing your body to generate momentum.",
      "Fully extend your arms at the bottom of each rep.",
      "Focus on pulling with your back muscles, not just your arms."
    ]
  },
  {
    id: 3,
    name: "Squats",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "SW_C1A-rejs",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Lower your body by bending your knees and hips, as if sitting in a chair.",
      "Keep your chest up and back straight.",
      "Lower until thighs are parallel to the ground or slightly below.",
      "Return to standing position."
    ],
    tips: [
      "Keep your weight on your heels.",
      "Don't let your knees cave inward.",
      "Keep your back in a neutral position.",
      "Breathe in as you lower and out as you stand."
    ]
  },
  {
    id: 4,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    videoId: "ytGaGIn3SjE",
    instructions: [
      "Stand with feet hip-width apart, toes under the bar.",
      "Bend at the hips and knees, grasp the bar with hands shoulder-width apart.",
      "Keep your back straight, chest up, and shoulders back.",
      "Push through your heels to stand up, keeping the bar close to your body.",
      "Return the weight to the ground with control."
    ],
    tips: [
      "Keep the bar close to your body throughout the movement.",
      "Don't round your back at any point.",
      "Drive through your heels, not your toes.",
      "Keep your head in a neutral position, don't look up or down excessively."
    ]
  },
  {
    id: 5,
    name: "Overhead Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "QAQ64hK4Xxs",
    instructions: [
      "Stand with feet shoulder-width apart, holding a barbell at shoulder level.",
      "Press the bar overhead until your arms are fully extended.",
      "Lower the bar back to shoulder level with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your core tight throughout the movement.",
      "Don't arch your back excessively.",
      "Keep your wrists straight and elbows tucked.",
      "Breathe out as you press up."
    ]
  },
  {
    id: 6,
    name: "Bent Over Rows",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "kBWAon7ItDw",
    instructions: [
      "Hold a barbell with an overhand grip, hands just outside shoulder width.",
      "Bend at the hips and knees, keeping your back straight.",
      "Pull the barbell to your lower ribcage.",
      "Lower the barbell with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your back flat and core engaged throughout the movement.",
      "Pull your elbows back, not up.",
      "Keep the barbell close to your body.",
      "Maintain a slight bend in your knees."
    ]
  },
  {
    id: 7,
    name: "Dumbbell Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "3frV3RnPfOY",
    instructions: [
      "Stand with feet hip-width apart, holding dumbbells at your sides.",
      "Step forward with one leg and lower your body until both knees are bent at 90-degree angles.",
      "Push through the heel of your front foot to return to the starting position.",
      "Repeat with the other leg."
    ],
    tips: [
      "Keep your upper body straight and shoulders back.",
      "Don't let your front knee extend past your toes.",
      "Keep your weight evenly distributed.",
      "Look straight ahead, not down."
    ]
  },
  {
    id: 8,
    name: "Incline Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "DbFgADa2PL8",
    instructions: [
      "Lie on an incline bench set to 15-30 degrees.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Lower the bar to your upper chest.",
      "Press the bar back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your feet flat on the floor.",
      "Maintain full contact between your back and the bench.",
      "Lower the weight under control.",
      "Focus on using your upper chest muscles."
    ]
  },
  {
    id: 9,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "GvRgijoJ2xY",
    instructions: [
      "Sit on the leg press machine with your back flat against the seat.",
      "Place your feet shoulder-width apart on the platform.",
      "Release the safety handles and lower the platform by bending your knees.",
      "Push through your heels to extend your legs without locking your knees.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't lock your knees at the top of the movement.",
      "Keep your back against the seat at all times.",
      "Don't let your knees collapse inward.",
      "Use a controlled motion throughout the exercise."
    ]
  },
  {
    id: 10,
    name: "Lateral Raises",
    muscle: "Shoulders",
    difficulty: "Beginner",
    videoId: "JIhbYYA1Q90",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides.",
      "Keep a slight bend in your elbows.",
      "Raise the dumbbells out to the sides until they reach shoulder height.",
      "Lower the dumbbells with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't swing the weights or use momentum.",
      "Keep your wrists in a neutral position.",
      "Don't raise the dumbbells above shoulder height.",
      "Maintain good posture throughout the exercise."
    ]
  },
  {
    id: 11,
    name: "Tricep Pushdowns",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "6kALZikXxLc",
    instructions: [
      "Stand facing a cable machine with a rope attachment at about chest height.",
      "Grab the rope with both hands, palms facing each other.",
      "Keep your elbows close to your body and push the rope down until your arms are fully extended.",
      "Slowly allow the rope to rise back up, keeping tension on your triceps.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your elbows fixed at your sides.",
      "Only move your forearms during the exercise.",
      "Don't lean forward too much.",
      "Squeeze your triceps at the bottom of the movement."
    ]
  },
  {
    id: 12,
    name: "Bicep Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "in7PaeYlhrM",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing forward.",
      "Keep your elbows close to your sides.",
      "Curl the weights up toward your shoulders.",
      "Lower the weights with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't swing your body to lift the weights.",
      "Keep your wrists straight throughout the movement.",
      "Focus on full range of motion.",
      "Keep your upper arms stationary."
    ]
  },
  {
    id: 13,
    name: "Romanian Deadlift",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "7AaaYJbCXUU",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell in front of your thighs.",
      "Keep your back straight and knees slightly bent.",
      "Hinge at the hips and lower the barbell down your legs.",
      "Lower until you feel a stretch in your hamstrings, typically just below the knees.",
      "Return to the starting position by driving your hips forward."
    ],
    tips: [
      "Keep the bar close to your legs throughout the movement.",
      "Maintain a neutral spine position.",
      "Focus on the hip hinge, not a squat movement.",
      "Feel the stretch in your hamstrings at the bottom of the movement."
    ]
  },
  {
    id: 14,
    name: "Dumbbell Flyes",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "UKwkChzThig",
    instructions: [
      "Lie on a flat bench with a dumbbell in each hand above your chest.",
      "Lower the dumbbells out to the sides in a wide arc.",
      "Keep a slight bend in your elbows throughout the movement.",
      "Return to the starting position, squeezing your chest muscles.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't lower the weights too far and strain your shoulders.",
      "Keep the movement slow and controlled.",
      "Focus on stretching and contracting your chest muscles.",
      "Keep your feet flat on the floor and back against the bench."
    ]
  },
  {
    id: 15,
    name: "Face Pulls",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "rep-zHkHfZY",
    instructions: [
      "Set a cable pulley to slightly above head height with a rope attachment.",
      "Grab the rope with both hands, palms facing each other.",
      "Step back until your arms are fully extended.",
      "Pull the rope toward your face, separating the ends as you pull.",
      "Return to the starting position with control."
    ],
    tips: [
      "Keep your elbows high during the movement.",
      "Pull the rope toward your face, not your chest.",
      "Squeeze your shoulder blades together at the end of the pull.",
      "Use a light weight to master proper form."
    ]
  },
  {
    id: 16,
    name: "Calf Raises",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "JbyjNymZOt0",
    instructions: [
      "Stand on a raised surface like a step or calf raise machine.",
      "Place the balls of your feet on the edge with heels hanging off.",
      "Lower your heels toward the floor.",
      "Raise your heels as high as possible by pushing through the balls of your feet.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Hold onto something for balance if needed.",
      "Perform the exercise slowly for maximum benefit.",
      "Don't bounce at the bottom of the movement.",
      "For added resistance, hold dumbbells or use a calf raise machine."
    ]
  },
  {
    id: 17,
    name: "Chest Dips",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "wjUmnZH528Y",
    instructions: [
      "Grip the parallel bars with palms facing inward.",
      "Lean your torso forward slightly to target the chest muscles.",
      "Lower your body by bending your elbows until you feel a stretch in your chest.",
      "Push back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep a slight forward lean to target the chest more than the triceps.",
      "Don't lower yourself too far to avoid shoulder strain.",
      "Keep your core engaged throughout the movement.",
      "For beginners, use an assisted dip machine."
    ]
  },
  {
    id: 18,
    name: "Hammer Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "TwD-YGVP4Bk",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing your body.",
      "Keep your elbows close to your sides.",
      "Curl the weights up toward your shoulders while keeping your palms facing each other.",
      "Lower the weights with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your upper arms stationary throughout the exercise.",
      "Don't swing the weights or use momentum.",
      "Focus on the brachialis and brachioradialis muscles (side of the arm).",
      "Keep your wrists straight throughout the movement."
    ]
  },
  {
    id: 19,
    name: "Barbell Hip Thrusts",
    muscle: "Glutes",
    difficulty: "Intermediate",
    videoId: "LM8XHLYJoYs",
    instructions: [
      "Sit on the ground with your upper back against a bench, knees bent, and feet flat on the floor.",
      "Place a padded barbell across your hips.",
      "Drive through your heels to lift your hips toward the ceiling.",
      "Squeeze your glutes at the top of the movement.",
      "Lower your hips with control and repeat."
    ],
    tips: [
      "Keep your chin tucked and maintain a neutral spine.",
      "Drive through your heels, not your toes.",
      "Use a pad or towel on the barbell for comfort.",
      "Focus on using your glutes, not your lower back."
    ]
  },
  {
    id: 20,
    name: "Cable Crossovers",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "Iwe6AmxVf7o",
    instructions: [
      "Stand between two cable machines with the pulleys set high.",
      "Grab the handles with each hand and step forward slightly.",
      "With a slight bend in your elbows, bring your hands together in front of you in an arcing motion.",
      "Slowly return to the starting position, feeling the stretch in your chest.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep a slight bend in your elbows throughout the movement.",
      "Focus on squeezing your chest muscles as you bring your hands together.",
      "Don't let the weights pull your arms back too far and strain your shoulders.",
      "Maintain good posture throughout the exercise."
    ]
  },
  {
    id: 21,
    name: "Mountain Climbers",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "cnyTQDSE884",
    instructions: [
      "Start in a push-up position with your arms straight and hands shoulder-width apart.",
      "Keeping your core tight, bring one knee toward your chest.",
      "Quickly switch legs, extending the bent leg back and bringing the other knee forward.",
      "Continue alternating legs in a running motion.",
      "Keep your hips down and maintain a straight line from your head to your heels."
    ],
    tips: [
      "Keep your core engaged throughout the exercise.",
      "Maintain a steady pace and control the movement.",
      "Don't let your hips rise too high during the exercise.",
      "Look slightly ahead of you, not directly down, to maintain good neck position."
    ]
  },
  {
    id: 22,
    name: "Kettlebell Swings",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "mKDIuUbH76o",
    instructions: [
      "Stand with feet slightly wider than shoulder-width apart, holding a kettlebell with both hands.",
      "Hinge at the hips and swing the kettlebell between your legs.",
      "Drive your hips forward to swing the kettlebell up to chest height.",
      "Let the kettlebell fall back down between your legs and repeat.",
      "Keep your back straight and core engaged throughout the movement."
    ],
    tips: [
      "The power comes from your hips, not your arms or shoulders.",
      "Keep the bar close to your body throughout the movement.",
      "Focus on the explosive hip extension.",
      "Keep your shoulders relaxed throughout the movement."
    ]
  },
  {
    id: 23,
    name: "Dips",
    muscle: "Arms",
    difficulty: "Intermediate",
    videoId: "6kALZikXxLc",
    instructions: [
      "Hold yourself up on parallel bars with straight arms.",
      "Lower your body by bending your elbows until they reach a 90-degree angle.",
      "Push back up to the starting position.",
      "Keep your elbows pointing behind you, not flaring out to the sides.",
      "Maintain control throughout the movement."
    ],
    tips: [
      "Keep your chest up and shoulders back throughout the movement.",
      "For beginners, use an assisted dip machine or bands for support.",
      "Don't go too low if you feel shoulder pain.",
      "For more chest emphasis, lean forward slightly; for more triceps, stay upright."
    ]
  },
  {
    id: 24,
    name: "Front Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "VfBOBhwXbro",
    instructions: [
      "Place a barbell on the front of your shoulders, with your fingertips under the bar.",
      "Keep your elbows high and pointing forward.",
      "With feet shoulder-width apart, squat down until your thighs are parallel to the ground.",
      "Keep your chest up and back straight throughout the movement.",
      "Push through your heels to return to the starting position."
    ],
    tips: [
      "Keep your elbows high to prevent the bar from rolling forward.",
      "If wrist mobility is an issue, try using a cross-arm grip.",
      "Maintain a neutral spine position throughout the movement.",
      "Focus on driving through your heels as you stand up."
    ]
  },
  {
    id: 25,
    name: "Good Mornings",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "5Xj6XUa77qc",
    instructions: [
      "Place a barbell across your upper back/traps (similar to a back squat position).",
      "With feet shoulder-width apart and knees slightly bent, hinge at the hips.",
      "Bend forward until your torso is nearly parallel to the floor.",
      "Keep your back straight and core engaged throughout the movement.",
      "Return to the upright position by driving your hips forward."
    ],
    tips: [
      "Start with light weight to master proper form.",
      "Keep your back flat and avoid rounding your spine.",
      "The movement comes from your hips, not your lower back.",
      "Keep your core tight throughout the exercise."
    ]
  },
  {
    id: 26,
    name: "Hang Cleans",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "YhGbXD-VIXw",
    instructions: [
      "Start standing with a barbell in your hands, arms extended.",
      "Bend your knees slightly and hinge at the hips to lower the bar to just above your knees.",
      "Explosively extend your hips, knees, and ankles, pulling the bar up.",
      "As the bar reaches chest height, quickly drop under it by bending your knees.",
      "Catch the bar at shoulder height in a front rack position."
    ],
    tips: [
      "The power comes from your legs and hips, not your arms.",
      "Keep the bar close to your body throughout the movement.",
      "Focus on the explosive hip extension.",
      "Keep your elbows high during the catch position."
    ]
  },
  {
    id: 27,
    name: "Bulgarian Split Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "hPlKPjohFS0",
    instructions: [
      "Stand about two feet away from a bench, facing away from it.",
      "Place the top of one foot on the bench behind you.",
      "Keep your chest up and slowly lower your body until your front thigh is parallel to the ground.",
      "Push through the heel of your front foot to return to the starting position.",
      "Complete all reps on one leg, then switch to the other."
    ],
    tips: [
      "Keep your front knee tracking over your toes, not caving inward.",
      "Maintain an upright posture throughout the movement.",
      "For balance, you can hold dumbbells at your sides or a single dumbbell at your chest.",
      "For more quad focus, lean forward slightly; for more glute focus, stay more upright."
    ]
  },
  {
    id: 28,
    name: "Inverted Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "hXTc1mDnZCw",
    instructions: [
      "Set up a barbell in a rack at waist height or use a Smith machine.",
      "Position yourself under the bar, gripping it with hands shoulder-width apart.",
      "Extend your legs and keep your body straight, heels on the ground.",
      "Pull your chest up to the bar by bending your elbows and squeezing your shoulder blades together.",
      "Lower yourself back down with control."
    ],
    tips: [
      "Keep your body straight and core engaged throughout the movement.",
      "The closer your feet are to the bar, the more difficult the exercise.",
      "For easier variation, bend your knees and put your feet flat on the floor.",
      "Squeeze your shoulder blades together at the top of the movement."
    ]
  },
  {
    id: 29,
    name: "Push Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "X6-DMh-t4nQ",
    instructions: [
      "Hold a barbell at shoulder height with hands slightly wider than shoulder-width apart.",
      "Bend your knees slightly in a quarter-squat position.",
      "Explosively extend your knees and hips to drive the bar overhead.",
      "Fully extend your arms overhead.",
      "Lower the bar back to your shoulders with control."
    ],
    tips: [
      "Use your legs to generate power - this isn't just a shoulder exercise.",
      "Keep your core tight throughout the movement.",
      "As you drive the bar overhead, push your head slightly back to allow the bar to travel in a straight line.",
      "Breathe out as you press up."
    ]
  },
  {
    id: 30,
    name: "Box Jumps",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "NBY9-kTuHEk",
    instructions: [
      "Stand facing a sturdy box or platform with feet shoulder-width apart.",
      "Bend into a quarter squat position and swing arms back.",
      "Swing arms forward and extend hips, knees, and ankles to jump onto the box.",
      "Land softly with knees bent, in a partial squat position.",
      "Step back down and repeat."
    ],
    tips: [
      "Start with a lower box height and progress as you improve.",
      "Land softly in the middle of the box with both feet at the same time.",
      "Always step down rather than jumping down to reduce impact.",
      "Use your arms to help generate upward momentum."
    ]
  },
  {
    id: 31,
    name: "Russian Twists",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "JyUqwkVpsi8",
    instructions: [
      "Sit on the floor with knees bent and feet raised slightly off the ground.",
      "Lean back slightly to feel your core engage.",
      "Hold your hands together or hold a weight in front of you.",
      "Twist your torso to the right, bringing your hands to the right side.",
      "Twist to the left and continue alternating sides."
    ],
    tips: [
      "Keep your back straight, not rounded.",
      "For more challenge, hold a weight or medicine ball.",
      "The higher you lift your feet, the more challenging the exercise.",
      "Focus on rotating from your core, not just moving your arms."
    ]
  },
  {
    id: 32,
    name: "Cable Lat Pulldowns",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "CAwf7n6Luuc",
    instructions: [
      "Sit at a lat pulldown machine with thighs secured under the pads.",
      "Grasp the bar with hands wider than shoulder-width apart.",
      "Pull the bar down to your upper chest while keeping your back straight.",
      "Squeeze your shoulder blades together at the bottom of the movement.",
      "Slowly return the bar to the starting position, fully extending your arms."
    ],
    tips: [
      "Keep your chest up and maintain a slight arch in your lower back.",
      "Pull with your elbows, not your hands.",
      "Don't lean too far back - only a slight lean is needed.",
      "For more lat engagement, use a wider grip; for more mid-back, use a narrower grip."
    ]
  },
  {
    id: 33,
    name: "Reverse Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "XRBAODXK4MW",
    instructions: [
      "Stand with feet hip-width apart, hands on hips or holding weights at sides.",
      "Step backward with one foot and lower your body until both knees are bent at 90 degrees.",
      "Your back knee should hover just above the floor.",
      "Push through the heel of your front foot to return to the starting position.",
      "Repeat with the other leg."
    ],
    tips: [
      "Keep your chest up and core engaged throughout the movement.",
      "Make sure your front knee stays aligned with your ankle.",
      "Step far enough back to create proper knee angles.",
      "For balance issues, perform next to a wall or chair for support."
    ]
  },
  {
    id: 34,
    name: "Side Planks",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "wqzrb67Dwf8",
    instructions: [
      "Lie on your side with legs straight and feet stacked.",
      "Prop yourself up on your forearm, with elbow directly under your shoulder.",
      "Lift your hips off the ground, creating a straight line from head to feet.",
      "Hold this position while maintaining proper form.",
      "Repeat on the other side."
    ],
    tips: [
      "Keep your body in a straight line from head to heels.",
      "For a modification, bend your bottom leg for more stability.",
      "For more challenge, lift your top leg or add a rotation.",
      "Don't let your hips sag or pike up during the hold."
    ]
  },
  {
    id: 35,
    name: "Clean and Jerk",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "c77CAvOJ1NM",
    instructions: [
      "Start with feet hip-width apart, barbell on the floor in front of you.",
      "Grip the bar slightly wider than shoulder-width, with a hook grip if possible.",
      "Perform a clean: pull the bar from the floor and catch it in a front rack position.",
      "Dip slightly at the knees, then explosively drive the bar overhead.",
      "Split your legs fore and aft as you push under the bar, then recover to a standing position."
    ],
    tips: [
      "Start with light weight and focus on technique before adding weight.",
      "Keep the bar close to your body throughout the movement.",
      "Use your legs and hips to generate power, not your arms.",
      "Practice the clean and the jerk separately before combining them."
    ]
  },
  {
    id: 36,
    name: "Seated Cable Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "GZbfZ033f74",
    instructions: [
      "Sit at a cable row machine with feet secured on the platform.",
      "Grasp the handle with both hands, arms extended.",
      "Keep your back straight and pull the handle toward your lower abdomen.",
      "Squeeze your shoulder blades together at the end of the movement.",
      "Slowly extend your arms back to the starting position."
    ],
    tips: [
      "Keep your back straight and chest up throughout the movement.",
      "Avoid rocking back and forth to move the weight.",
      "Pull with your elbows, not your hands.",
      "For more lat engagement, use a wider grip; for more mid-back, use a close grip."
    ]
  },
  {
    id: 37,
    name: "Jump Rope",
    muscle: "Cardio",
    difficulty: "Beginner",
    videoId: "u3zgwmWjKaQ",
    instructions: [
      "Hold the handles of the jump rope with hands at hip height.",
      "Rotate your wrists to swing the rope over your head and under your feet.",
      "Jump just high enough to let the rope pass under your feet.",
      "Land softly on the balls of your feet.",
      "Establish a rhythm and continue jumping."
    ],
    tips: [
      "Keep your elbows close to your sides and rotate from the wrists.",
      "Jump only 1-2 inches off the ground to conserve energy.",
      "Look straight ahead, not down at your feet.",
      "Start with slow, controlled jumps before increasing speed."
    ]
  },
  {
    id: 38,
    name: "Burpees",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "auBLPXO8Fww",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Squat down and place hands on the floor in front of you.",
      "Jump feet back into a plank position.",
      "Perform a push-up (optional for added difficulty).",
      "Jump feet forward to return to squat position, then explosively jump up with arms overhead."
    ],
    tips: [
      "For beginners, step back instead of jumping back to plank position.",
      "Keep your core engaged throughout the entire movement.",
      "Land softly when jumping to reduce impact on joints.",
      "For more intensity, add a push-up at the bottom of the movement."
    ]
  },
  {
    id: 39,
    name: "Ab Wheel Rollouts",
    muscle: "Core",
    difficulty: "Advanced",
    videoId: "rqiTPdK1c_I",
    instructions: [
      "Kneel on the floor holding an ab wheel with both hands.",
      "Place the wheel on the floor in front of you with arms extended.",
      "Slowly roll the wheel forward, extending your body as far as possible without touching the ground with your stomach.",
      "Use your core to pull the wheel back to the starting position.",
      "Keep your back flat throughout the movement."
    ],
    tips: [
      "If you're a beginner, limit how far you roll out until you build more strength.",
      "Keep your core tight and don't let your lower back sag.",
      "For a regression, perform rollouts against a wall to limit distance.",
      "For an advanced version, start from a standing position."
    ]
  },
  {
    id: 40,
    name: "Medicine Ball Slams",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "kvz8kQ_gNdE",
    instructions: [
      "Stand with feet shoulder-width apart, holding a medicine ball with both hands.",
      "Raise the ball overhead, extending onto your toes.",
      "Forcefully throw the ball down to the ground in front of you, using your core and arms.",
      "Catch the ball as it bounces up (or pick it up) and repeat.",
      "Keep your core engaged throughout the movement."
    ],
    tips: [
      "Use your entire body, not just your arms, to slam the ball.",
      "Choose an appropriate weight that allows for explosive movement.",
      "Make sure you're on a surface where the ball can bounce safely.",
      "Exhale forcefully as you slam the ball down."
    ]
  }
];

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const exerciseId = parseInt(id || "1");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const exercise = exercisesData.find(ex => ex.id === exerciseId);
  
  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Exercise not found</h1>
        <Link to="/exercises" className="text-blue-400">
          Back to exercises
        </Link>
      </div>
    );
  }

  const prevExercise = exercisesData.find(ex => ex.id === exerciseId - 1);
  const nextExercise = exercisesData.find(ex => ex.id === exerciseId + 1);

  const toggleFullscreen = () => {
    const videoElement = document.getElementById('exercise-video');
    if (!videoElement) return;

    if (!isFullscreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const replayVideo = () => {
    const iframe = document.getElementById('exercise-video') as HTMLIFrameElement;
    if (iframe && iframe.src) {
      iframe.src = iframe.src;
    }
    toast({
      title: "Video replaying",
      description: "The video is being replayed from the beginning.",
    });
  };

  const addToWorkout = () => {
    toast({
      title: "Added to workout",
      description: `${exercise.name} has been added to your workout.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/exercises" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">{exercise.name}</h1>
      </header>
      
      <div className="aspect-video bg-black relative">
        <iframe 
          id="exercise-video"
          src={`https://www.youtube.com/embed/${exercise.videoId}?rel=0&modestbranding=1`}
          title={exercise.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="icon" 
            className="bg-black/50 hover:bg-black/70 text-white"
            onClick={toggleFullscreen}
          >
            <Maximize size={20} />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="bg-black/50 hover:bg-black/70 text-white"
            onClick={replayVideo}
          >
            <Repeat size={20} />
          </Button>
        </div>
      </div>
      
      <div className="flex justify-between px-4 pt-2">
        {prevExercise ? (
          <Link to={`/exercise/${prevExercise.id}`} className="flex items-center text-sm text-blue-400">
            <SkipBack size={16} className="mr-1" /> Previous
          </Link>
        ) : (
          <div></div>
        )}
        {nextExercise ? (
          <Link to={`/exercise/${nextExercise.id}`} className="flex items-center text-sm text-blue-400">
            Next <SkipForward size={16} className="ml-1" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="text-gray-400">Target: {exercise.muscle} • {exercise.difficulty}</p>
          </div>
          <Button onClick={addToWorkout} className="bg-blue-600 hover:bg-blue-700">
            Log Workout
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {exercise.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
