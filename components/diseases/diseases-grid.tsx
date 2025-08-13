"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const diseases = [
  // A
  {
    name: "Asthma",
    category: "Respiratory",
    severity: "Moderate",
    symptoms: ["Shortness of breath", "Wheezing", "Chest tightness", "Coughing", "Difficulty sleeping"],
    description: "A respiratory condition in which airways narrow and swell, producing extra mucus.",
    prevalence: "Common",
    letter: "A",
    causes: ["Allergens", "Air pollution", "Respiratory infections", "Physical activity", "Weather changes"],
    treatment: ["Inhalers", "Bronchodilators", "Corticosteroids", "Allergy medications"],
    prevention: ["Avoid triggers", "Regular exercise", "Maintain healthy weight", "Get vaccinated"],
  },
  {
    name: "Alzheimer's Disease",
    category: "Neurological",
    severity: "Serious",
    symptoms: ["Memory loss", "Confusion", "Difficulty speaking", "Personality changes", "Poor judgment"],
    description: "A progressive disorder that causes brain cells to waste away and die.",
    prevalence: "Common",
    letter: "A",
    causes: ["Age", "Genetics", "Head trauma", "Cardiovascular disease"],
    treatment: ["Cholinesterase inhibitors", "Memantine", "Cognitive therapy", "Supportive care"],
    prevention: ["Regular exercise", "Mental stimulation", "Social engagement", "Healthy diet"],
  },
  {
    name: "Anemia",
    category: "Hematological",
    severity: "Moderate",
    symptoms: ["Fatigue", "Weakness", "Pale skin", "Shortness of breath", "Cold hands and feet"],
    description: "A condition in which you lack enough healthy red blood cells to carry adequate oxygen.",
    prevalence: "Common",
    letter: "A",
    causes: ["Iron deficiency", "Vitamin deficiency", "Chronic diseases", "Blood loss"],
    treatment: ["Iron supplements", "Vitamin B12 injections", "Dietary changes", "Blood transfusion"],
    prevention: ["Iron-rich diet", "Vitamin supplements", "Regular checkups"],
  },
  {
    name: "Arthritis",
    category: "Musculoskeletal",
    severity: "Moderate",
    symptoms: ["Joint pain", "Stiffness", "Swelling", "Reduced range of motion", "Warmth around joints"],
    description: "Inflammation of one or more joints, causing pain and stiffness.",
    prevalence: "Very Common",
    letter: "A",
    causes: ["Age", "Genetics", "Previous injuries", "Obesity", "Autoimmune disorders"],
    treatment: ["NSAIDs", "Physical therapy", "Corticosteroid injections", "Disease-modifying drugs"],
    prevention: ["Maintain healthy weight", "Regular exercise", "Protect joints", "Healthy diet"],
  },
  {
    name: "Acne",
    category: "Dermatological",
    severity: "Mild",
    symptoms: ["Pimples", "Blackheads", "Whiteheads", "Cysts", "Scarring", "Oily skin"],
    description: "A skin condition that occurs when hair follicles become plugged with oil and dead skin cells.",
    prevalence: "Very Common",
    letter: "A",
    causes: ["Hormones", "Genetics", "Bacteria", "Excess oil production", "Clogged pores"],
    treatment: ["Topical retinoids", "Antibiotics", "Benzoyl peroxide", "Hormonal therapy"],
    prevention: ["Gentle cleansing", "Avoid touching face", "Use non-comedogenic products", "Manage stress"],
  },
  {
    name: "Appendicitis",
    category: "Digestive",
    severity: "Serious",
    symptoms: ["Abdominal pain", "Nausea", "Vomiting", "Fever", "Loss of appetite", "Constipation"],
    description: "Inflammation of the appendix, a small pouch attached to the large intestine.",
    prevalence: "Common",
    letter: "A",
    causes: ["Blockage", "Infection", "Inflammatory bowel disease", "Trauma"],
    treatment: ["Surgery", "Antibiotics", "Pain management", "IV fluids"],
    prevention: ["High-fiber diet", "Adequate hydration", "Regular exercise", "Avoid constipation"],
  },
  {
    name: "Anxiety Disorders",
    category: "Mental Health",
    severity: "Moderate",
    symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Sleep problems"],
    description: "A group of mental health disorders characterized by significant feelings of anxiety and fear.",
    prevalence: "Very Common",
    letter: "A",
    causes: ["Genetics", "Brain chemistry", "Personality", "Life events", "Medical conditions"],
    treatment: ["Therapy", "Medications", "Lifestyle changes", "Relaxation techniques"],
    prevention: ["Stress management", "Regular exercise", "Adequate sleep", "Limit caffeine"],
  },
  // B
  {
    name: "Bronchitis",
    category: "Respiratory",
    severity: "Mild",
    symptoms: ["Persistent cough", "Mucus production", "Fatigue", "Chest discomfort", "Mild fever"],
    description: "Inflammation of the lining of bronchial tubes, which carry air to and from the lungs.",
    prevalence: "Common",
    letter: "B",
    causes: ["Viral infections", "Bacterial infections", "Smoking", "Air pollution"],
    treatment: ["Rest", "Fluids", "Cough suppressants", "Bronchodilators", "Antibiotics if bacterial"],
    prevention: ["Avoid smoking", "Get vaccinated", "Wash hands frequently", "Avoid air pollution"],
  },
  {
    name: "Bipolar Disorder",
    category: "Mental Health",
    severity: "Serious",
    symptoms: ["Mood swings", "Manic episodes", "Depression", "Sleep disturbances", "Impulsive behavior"],
    description: "A mental health condition that causes extreme mood swings including emotional highs and lows.",
    prevalence: "Uncommon",
    letter: "B",
    causes: ["Genetics", "Brain structure", "Environmental factors", "Stress"],
    treatment: ["Mood stabilizers", "Antipsychotics", "Antidepressants", "Psychotherapy"],
    prevention: ["Stress management", "Regular sleep", "Avoid drugs and alcohol", "Medication compliance"],
  },
  {
    name: "Breast Cancer",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Breast lump", "Breast pain", "Skin changes", "Nipple discharge", "Swollen lymph nodes"],
    description: "Cancer that forms in the cells of the breasts, most commonly in women but can occur in men.",
    prevalence: "Common",
    letter: "B",
    causes: ["Age", "Genetics", "Hormones", "Lifestyle factors", "Environmental factors"],
    treatment: ["Surgery", "Chemotherapy", "Radiation therapy", "Hormone therapy", "Targeted therapy"],
    prevention: ["Regular screening", "Healthy lifestyle", "Limit alcohol", "Maintain healthy weight"],
  },
  {
    name: "Bell's Palsy",
    category: "Neurological",
    severity: "Moderate",
    symptoms: ["Facial weakness", "Drooping mouth", "Difficulty closing eye", "Loss of taste", "Ear pain"],
    description: "Sudden weakness in the muscles on one side of the face causing facial drooping.",
    prevalence: "Uncommon",
    letter: "B",
    causes: ["Viral infections", "Immune system", "Genetics", "Diabetes"],
    treatment: ["Corticosteroids", "Antiviral medications", "Physical therapy", "Eye protection"],
    prevention: ["No known prevention", "Manage diabetes", "Avoid stress", "Healthy lifestyle"],
  },
  // C
  {
    name: "COVID-19",
    category: "Infectious",
    severity: "Moderate",
    symptoms: ["Fever", "Cough", "Shortness of breath", "Loss of taste/smell", "Fatigue", "Body aches"],
    description: "A respiratory illness caused by the SARS-CoV-2 virus.",
    prevalence: "Very Common",
    letter: "C",
    causes: ["SARS-CoV-2 virus", "Airborne transmission", "Contact transmission"],
    treatment: ["Rest", "Fluids", "Antiviral medications", "Oxygen therapy", "Supportive care"],
    prevention: ["Vaccination", "Mask wearing", "Social distancing", "Hand hygiene"],
  },
  {
    name: "Cataracts",
    category: "Ophthalmological",
    severity: "Moderate",
    symptoms: ["Blurred vision", "Light sensitivity", "Night vision problems", "Seeing halos", "Faded colors"],
    description: "Clouding of the normally clear lens of the eye.",
    prevalence: "Common",
    letter: "C",
    causes: ["Aging", "Diabetes", "Smoking", "UV radiation", "Eye injury"],
    treatment: ["Surgery", "Prescription glasses", "Magnifying lenses", "Brighter lighting"],
    prevention: ["Wear sunglasses", "Quit smoking", "Control diabetes", "Regular eye exams"],
  },
  {
    name: "Celiac Disease",
    category: "Digestive",
    severity: "Moderate",
    symptoms: ["Diarrhea", "Abdominal pain", "Bloating", "Weight loss", "Fatigue", "Skin rash"],
    description: "An immune reaction to eating gluten, a protein found in wheat, barley, and rye.",
    prevalence: "Uncommon",
    letter: "C",
    causes: ["Genetics", "Gluten consumption", "Environmental factors"],
    treatment: ["Gluten-free diet", "Nutritional supplements", "Medications for complications"],
    prevention: ["Gluten-free diet", "Regular monitoring", "Nutritional counseling"],
  },
  {
    name: "Chronic Kidney Disease",
    category: "Urological",
    severity: "Serious",
    symptoms: ["Fatigue", "Swelling", "Changes in urination", "Nausea", "Loss of appetite", "Sleep problems"],
    description: "Long-term condition where the kidneys gradually lose function over time.",
    prevalence: "Common",
    letter: "C",
    causes: ["Diabetes", "High blood pressure", "Polycystic kidney disease", "Glomerulonephritis"],
    treatment: ["Blood pressure control", "Diabetes management", "Dialysis", "Kidney transplant"],
    prevention: ["Control diabetes", "Manage blood pressure", "Healthy diet", "Regular exercise"],
  },
  {
    name: "Conjunctivitis",
    category: "Ophthalmological",
    severity: "Mild",
    symptoms: ["Red eyes", "Itching", "Discharge", "Tearing", "Burning sensation", "Blurred vision"],
    description: "Inflammation or infection of the transparent membrane that lines the eyelid and eyeball.",
    prevalence: "Very Common",
    letter: "C",
    causes: ["Viral infections", "Bacterial infections", "Allergies", "Irritants"],
    treatment: ["Antibiotic drops", "Antiviral medications", "Antihistamines", "Cold compresses"],
    prevention: ["Hand hygiene", "Avoid touching eyes", "Don't share personal items", "Avoid allergens"],
  },
  {
    name: "Crohn's Disease",
    category: "Digestive",
    severity: "Serious",
    symptoms: ["Abdominal pain", "Diarrhea", "Weight loss", "Fatigue", "Fever", "Blood in stool"],
    description: "A type of inflammatory bowel disease that causes inflammation in the digestive tract.",
    prevalence: "Uncommon",
    letter: "C",
    causes: ["Immune system", "Genetics", "Environmental factors", "Smoking"],
    treatment: ["Anti-inflammatory drugs", "Immunosuppressants", "Biologics", "Surgery"],
    prevention: ["No known prevention", "Avoid smoking", "Stress management", "Healthy diet"],
  },
  // D
  {
    name: "Diabetes Type 2",
    category: "Endocrine",
    severity: "Serious",
    symptoms: ["Increased thirst", "Frequent urination", "Fatigue", "Blurred vision", "Slow healing wounds"],
    description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
    prevalence: "Very Common",
    letter: "D",
    causes: ["Insulin resistance", "Genetics", "Obesity", "Sedentary lifestyle"],
    treatment: ["Metformin", "Insulin", "Lifestyle changes", "Blood sugar monitoring"],
    prevention: ["Healthy diet", "Regular exercise", "Weight management", "Regular checkups"],
  },
  {
    name: "Depression",
    category: "Mental Health",
    severity: "Serious",
    symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep disturbances", "Appetite changes"],
    description: "A mood disorder that causes persistent feelings of sadness and loss of interest.",
    prevalence: "Common",
    letter: "D",
    causes: ["Brain chemistry", "Genetics", "Life events", "Medical conditions"],
    treatment: ["Antidepressants", "Psychotherapy", "Lifestyle changes", "Support groups"],
    prevention: ["Stress management", "Regular exercise", "Social support", "Healthy lifestyle"],
  },
  {
    name: "Dengue Fever",
    category: "Infectious",
    severity: "Serious",
    symptoms: ["High fever", "Severe headache", "Eye pain", "Muscle aches", "Skin rash", "Nausea"],
    description: "A mosquito-borne viral infection causing flu-like illness.",
    prevalence: "Common",
    letter: "D",
    causes: ["Dengue virus", "Aedes mosquito bites"],
    treatment: ["Supportive care", "Fluid replacement", "Pain relievers", "Hospitalization if severe"],
    prevention: ["Mosquito control", "Use repellents", "Eliminate standing water", "Protective clothing"],
  },
  {
    name: "Dementia",
    category: "Neurological",
    severity: "Serious",
    symptoms: ["Memory loss", "Confusion", "Difficulty communicating", "Personality changes", "Poor judgment"],
    description: "A general term for loss of memory, language, problem-solving and other thinking abilities.",
    prevalence: "Common",
    letter: "D",
    causes: ["Alzheimer's disease", "Vascular problems", "Lewy body disease", "Frontotemporal disorders"],
    treatment: ["Medications", "Cognitive therapy", "Behavioral interventions", "Supportive care"],
    prevention: ["Mental stimulation", "Physical exercise", "Social engagement", "Healthy diet"],
  },
  {
    name: "Diverticulitis",
    category: "Digestive",
    severity: "Moderate",
    symptoms: ["Abdominal pain", "Fever", "Nausea", "Changes in bowel habits", "Bloating"],
    description: "Inflammation or infection of small pouches that can form in the walls of the colon.",
    prevalence: "Common",
    letter: "D",
    causes: ["Low-fiber diet", "Age", "Obesity", "Smoking", "Lack of exercise"],
    treatment: ["Antibiotics", "Pain relievers", "Liquid diet", "Surgery if severe"],
    prevention: ["High-fiber diet", "Regular exercise", "Adequate hydration", "Avoid smoking"],
  },
  // E
  {
    name: "Eczema",
    category: "Dermatological",
    severity: "Mild",
    symptoms: ["Itchy skin", "Red patches", "Dry skin", "Skin inflammation", "Cracked skin"],
    description: "A condition that makes skin red and itchy, commonly in children but can occur at any age.",
    prevalence: "Common",
    letter: "E",
    causes: ["Genetics", "Environmental factors", "Immune system dysfunction", "Stress"],
    treatment: ["Moisturizers", "Topical corticosteroids", "Antihistamines", "Immunomodulators"],
    prevention: ["Moisturize regularly", "Avoid triggers", "Use mild soaps", "Manage stress"],
  },
  {
    name: "Epilepsy",
    category: "Neurological",
    severity: "Serious",
    symptoms: [
      "Seizures",
      "Temporary confusion",
      "Staring spells",
      "Uncontrollable movements",
      "Loss of consciousness",
    ],
    description: "A neurological disorder in which brain activity becomes abnormal, causing seizures.",
    prevalence: "Uncommon",
    letter: "E",
    causes: ["Genetics", "Head trauma", "Brain infections", "Stroke", "Brain tumors"],
    treatment: ["Anti-seizure medications", "Surgery", "Vagus nerve stimulation", "Ketogenic diet"],
    prevention: ["Prevent head injuries", "Manage risk factors", "Take medications as prescribed"],
  },
  {
    name: "Endometriosis",
    category: "Gynecological",
    severity: "Moderate",
    symptoms: ["Pelvic pain", "Heavy periods", "Pain during intercourse", "Infertility", "Fatigue"],
    description: "A disorder in which tissue similar to the uterine lining grows outside the uterus.",
    prevalence: "Common",
    letter: "E",
    causes: ["Retrograde menstruation", "Genetics", "Immune system disorders", "Hormones"],
    treatment: ["Pain medications", "Hormone therapy", "Surgery", "Fertility treatments"],
    prevention: ["No known prevention", "Regular exercise", "Limit caffeine", "Manage stress"],
  },
  {
    name: "Emphysema",
    category: "Respiratory",
    severity: "Serious",
    symptoms: ["Shortness of breath", "Chronic cough", "Fatigue", "Weight loss", "Frequent infections"],
    description: "A lung condition that causes shortness of breath due to damaged air sacs in the lungs.",
    prevalence: "Common",
    letter: "E",
    causes: ["Smoking", "Air pollution", "Chemical fumes", "Genetics", "Age"],
    treatment: ["Bronchodilators", "Steroids", "Oxygen therapy", "Pulmonary rehabilitation"],
    prevention: ["Don't smoke", "Avoid air pollution", "Get vaccinated", "Regular exercise"],
  },
  // F
  {
    name: "Fibromyalgia",
    category: "Musculoskeletal",
    severity: "Moderate",
    symptoms: ["Widespread pain", "Fatigue", "Sleep disturbances", "Cognitive difficulties", "Mood issues"],
    description: "A disorder characterized by widespread musculoskeletal pain accompanied by fatigue.",
    prevalence: "Common",
    letter: "F",
    causes: ["Genetics", "Infections", "Physical trauma", "Psychological stress"],
    treatment: ["Pain relievers", "Antidepressants", "Anti-seizure drugs", "Physical therapy"],
    prevention: ["Regular exercise", "Stress management", "Good sleep hygiene", "Healthy lifestyle"],
  },
  {
    name: "Food Poisoning",
    category: "Infectious",
    severity: "Mild",
    symptoms: ["Nausea", "Vomiting", "Diarrhea", "Abdominal cramps", "Fever", "Headache"],
    description: "Illness caused by eating contaminated food with bacteria, viruses, or parasites.",
    prevalence: "Very Common",
    letter: "F",
    causes: ["Contaminated food", "Poor food handling", "Bacterial infections", "Viral infections"],
    treatment: ["Rest", "Fluids", "Electrolyte replacement", "Anti-diarrheal medications"],
    prevention: ["Food safety", "Proper cooking", "Hand hygiene", "Safe food storage"],
  },
  {
    name: "Fatty Liver Disease",
    category: "Hepatological",
    severity: "Moderate",
    symptoms: ["Fatigue", "Abdominal pain", "Weight loss", "Weakness", "Confusion"],
    description: "A condition in which fat builds up in the liver, potentially causing inflammation and damage.",
    prevalence: "Common",
    letter: "F",
    causes: ["Obesity", "Diabetes", "High cholesterol", "Alcohol consumption", "Medications"],
    treatment: ["Weight loss", "Exercise", "Diet changes", "Medications", "Avoid alcohol"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Limit alcohol", "Healthy diet"],
  },
  // G
  {
    name: "Gastritis",
    category: "Digestive",
    severity: "Mild",
    symptoms: ["Stomach pain", "Nausea", "Vomiting", "Loss of appetite", "Bloating", "Heartburn"],
    description: "Inflammation of the stomach lining that can be acute or chronic.",
    prevalence: "Common",
    letter: "G",
    causes: ["H. pylori bacteria", "NSAIDs", "Alcohol", "Stress", "Autoimmune disorders"],
    treatment: ["Antacids", "Proton pump inhibitors", "Antibiotics", "Dietary changes"],
    prevention: ["Avoid irritants", "Manage stress", "Eat smaller meals", "Limit alcohol"],
  },
  {
    name: "Glaucoma",
    category: "Ophthalmological",
    severity: "Serious",
    symptoms: ["Gradual vision loss", "Eye pain", "Nausea", "Vomiting", "Blurred vision", "Halos around lights"],
    description: "A group of eye conditions that damage the optic nerve, often due to high eye pressure.",
    prevalence: "Common",
    letter: "G",
    causes: ["High eye pressure", "Age", "Genetics", "Medical conditions"],
    treatment: ["Eye drops", "Oral medications", "Laser therapy", "Surgery"],
    prevention: ["Regular eye exams", "Exercise", "Protect eyes", "Take medications as prescribed"],
  },
  {
    name: "Gallstones",
    category: "Digestive",
    severity: "Moderate",
    symptoms: ["Abdominal pain", "Nausea", "Vomiting", "Fever", "Jaundice", "Clay-colored stools"],
    description: "Hardened deposits of digestive fluid that can form in the gallbladder.",
    prevalence: "Common",
    letter: "G",
    causes: ["Cholesterol", "Bilirubin", "Gallbladder emptying problems", "Genetics", "Diet"],
    treatment: ["Surgery", "Medications", "Shock wave therapy", "Dietary changes"],
    prevention: ["Maintain healthy weight", "Eat regular meals", "High-fiber diet", "Exercise regularly"],
  },
  {
    name: "Gout",
    category: "Musculoskeletal",
    severity: "Moderate",
    symptoms: ["Severe joint pain", "Swelling", "Redness", "Tenderness", "Limited range of motion"],
    description: "A complex form of arthritis characterized by sudden, severe attacks of pain and swelling.",
    prevalence: "Common",
    letter: "G",
    causes: ["High uric acid", "Diet", "Genetics", "Medical conditions", "Medications"],
    treatment: ["NSAIDs", "Colchicine", "Corticosteroids", "Uric acid-lowering drugs"],
    prevention: ["Limit purine-rich foods", "Stay hydrated", "Maintain healthy weight", "Limit alcohol"],
  },
  // H
  {
    name: "Hypertension",
    category: "Cardiovascular",
    severity: "Serious",
    symptoms: ["Often no symptoms", "Headaches", "Dizziness", "Chest pain", "Shortness of breath"],
    description: "A condition in which the force of blood against artery walls is too high.",
    prevalence: "Very Common",
    letter: "H",
    causes: ["Genetics", "Age", "Obesity", "Sedentary lifestyle", "High sodium diet"],
    treatment: ["ACE inhibitors", "Diuretics", "Beta-blockers", "Lifestyle changes"],
    prevention: ["Healthy diet", "Regular exercise", "Weight management", "Limit alcohol"],
  },
  {
    name: "Hepatitis B",
    category: "Infectious",
    severity: "Serious",
    symptoms: ["Fatigue", "Nausea", "Abdominal pain", "Jaundice", "Dark urine", "Joint pain"],
    description: "A viral infection that attacks the liver and can cause both acute and chronic disease.",
    prevalence: "Common",
    letter: "H",
    causes: ["Hepatitis B virus", "Blood contact", "Sexual transmission", "Mother to child"],
    treatment: ["Antiviral medications", "Interferon", "Liver transplant", "Supportive care"],
    prevention: ["Vaccination", "Safe sex", "Avoid sharing needles", "Screen blood products"],
  },
  {
    name: "Heart Disease",
    category: "Cardiovascular",
    severity: "Serious",
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue", "Irregular heartbeat", "Swelling"],
    description: "A range of conditions that affect the heart including coronary artery disease.",
    prevalence: "Very Common",
    letter: "H",
    causes: ["High cholesterol", "High blood pressure", "Smoking", "Diabetes", "Obesity"],
    treatment: ["Medications", "Surgery", "Lifestyle changes", "Cardiac rehabilitation"],
    prevention: ["Healthy diet", "Regular exercise", "Don't smoke", "Manage stress"],
  },
  {
    name: "Hypothyroidism",
    category: "Endocrine",
    severity: "Moderate",
    symptoms: ["Fatigue", "Weight gain", "Cold sensitivity", "Dry skin", "Hair loss", "Depression"],
    description: "A condition in which the thyroid gland doesn't produce enough thyroid hormone.",
    prevalence: "Common",
    letter: "H",
    causes: ["Autoimmune disease", "Thyroid surgery", "Radiation therapy", "Medications"],
    treatment: ["Thyroid hormone replacement", "Regular monitoring", "Lifestyle changes"],
    prevention: ["Adequate iodine", "Regular checkups", "Healthy lifestyle"],
  },
  // I
  {
    name: "Influenza",
    category: "Infectious",
    severity: "Moderate",
    symptoms: ["Fever", "Body aches", "Fatigue", "Cough", "Sore throat", "Runny nose"],
    description: "A viral infection that attacks the respiratory system — nose, throat and lungs.",
    prevalence: "Very Common",
    letter: "I",
    causes: ["Influenza viruses", "Airborne transmission", "Contact transmission"],
    treatment: ["Antiviral medications", "Rest", "Fluids", "Pain relievers"],
    prevention: ["Annual vaccination", "Hand hygiene", "Avoid close contact", "Cover coughs"],
  },
  {
    name: "Irritable Bowel Syndrome",
    category: "Digestive",
    severity: "Moderate",
    symptoms: ["Abdominal pain", "Bloating", "Gas", "Diarrhea", "Constipation", "Mucus in stool"],
    description: "A common disorder that affects the large intestine causing cramping and pain.",
    prevalence: "Common",
    letter: "I",
    causes: ["Unknown", "Muscle contractions", "Nervous system", "Inflammation", "Gut bacteria"],
    treatment: ["Dietary changes", "Fiber supplements", "Anti-diarrheal medications", "Probiotics"],
    prevention: ["Identify triggers", "Manage stress", "Regular exercise", "Adequate sleep"],
  },
  {
    name: "Insomnia",
    category: "Sleep Disorders",
    severity: "Moderate",
    symptoms: ["Difficulty falling asleep", "Frequent awakening", "Early morning awakening", "Daytime fatigue"],
    description: "A sleep disorder in which you have trouble falling and/or staying asleep.",
    prevalence: "Very Common",
    letter: "I",
    causes: ["Stress", "Anxiety", "Depression", "Medical conditions", "Medications", "Caffeine"],
    treatment: ["Sleep hygiene", "Cognitive behavioral therapy", "Medications", "Relaxation techniques"],
    prevention: ["Regular sleep schedule", "Comfortable sleep environment", "Limit caffeine", "Exercise regularly"],
  },
  // J
  {
    name: "Jaundice",
    category: "Hepatological",
    severity: "Moderate",
    symptoms: ["Yellow skin", "Yellow eyes", "Dark urine", "Pale stools", "Fatigue", "Abdominal pain"],
    description: "A condition in which the skin and whites of the eyes turn yellow due to high bilirubin.",
    prevalence: "Common",
    letter: "J",
    causes: ["Liver disease", "Bile duct obstruction", "Blood disorders", "Medications"],
    treatment: ["Treat underlying cause", "Supportive care", "Phototherapy", "Surgery if needed"],
    prevention: ["Avoid hepatitis", "Limit alcohol", "Medication safety", "Healthy lifestyle"],
  },
  // K
  {
    name: "Kidney Stones",
    category: "Urological",
    severity: "Moderate",
    symptoms: ["Severe pain", "Nausea", "Vomiting", "Blood in urine", "Frequent urination", "Fever"],
    description: "Hard deposits made of minerals and salts that form inside the kidneys.",
    prevalence: "Common",
    letter: "K",
    causes: ["Dehydration", "Diet", "Obesity", "Medical conditions", "Supplements"],
    treatment: ["Pain medication", "Increased fluids", "Medical therapy", "Surgery"],
    prevention: ["Stay hydrated", "Limit sodium", "Reduce animal protein", "Maintain healthy weight"],
  },
  // L
  {
    name: "Lupus",
    category: "Autoimmune",
    severity: "Serious",
    symptoms: ["Fatigue", "Joint pain", "Skin rash", "Fever", "Hair loss", "Mouth ulcers"],
    description: "An autoimmune disease in which the body's immune system attacks its own tissues.",
    prevalence: "Uncommon",
    letter: "L",
    causes: ["Genetics", "Environment", "Infections", "Stress"],
    treatment: ["NSAIDs", "Antimalarials", "Corticosteroids", "Immunosuppressants"],
    prevention: ["Sun protection", "Regular exercise", "Stress management", "Avoid triggers"],
  },
  {
    name: "Lung Cancer",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Persistent cough", "Chest pain", "Shortness of breath", "Weight loss", "Coughing blood"],
    description: "A type of cancer that begins in the lungs and may spread to other parts of the body.",
    prevalence: "Common",
    letter: "L",
    causes: ["Smoking", "Secondhand smoke", "Radon", "Asbestos", "Air pollution"],
    treatment: ["Surgery", "Chemotherapy", "Radiation therapy", "Targeted therapy", "Immunotherapy"],
    prevention: ["Don't smoke", "Avoid secondhand smoke", "Test for radon", "Avoid carcinogens"],
  },
  {
    name: "Leukemia",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Fatigue", "Frequent infections", "Easy bruising", "Weight loss", "Swollen lymph nodes"],
    description: "A group of blood cancers that usually begin in the bone marrow.",
    prevalence: "Uncommon",
    letter: "L",
    causes: ["Genetics", "Previous cancer treatment", "Genetic disorders", "Chemical exposure"],
    treatment: ["Chemotherapy", "Radiation therapy", "Targeted therapy", "Stem cell transplant"],
    prevention: ["Avoid radiation", "Limit chemical exposure", "Don't smoke", "Healthy lifestyle"],
  },
  // M
  {
    name: "Migraine",
    category: "Neurological",
    severity: "Moderate",
    symptoms: ["Severe headache", "Nausea", "Light sensitivity", "Sound sensitivity", "Visual disturbances"],
    description: "A neurological condition that can cause severe throbbing pain or pulsing sensation.",
    prevalence: "Common",
    letter: "M",
    causes: ["Genetics", "Hormonal changes", "Stress", "Certain foods", "Sleep changes"],
    treatment: ["Pain relievers", "Triptans", "Preventive medications", "Lifestyle changes"],
    prevention: ["Identify triggers", "Regular sleep", "Stress management", "Stay hydrated"],
  },
  {
    name: "Multiple Sclerosis",
    category: "Neurological",
    severity: "Serious",
    symptoms: ["Fatigue", "Numbness", "Weakness", "Vision problems", "Balance issues", "Cognitive changes"],
    description: "A disease in which the immune system attacks the protective covering of nerve fibers.",
    prevalence: "Uncommon",
    letter: "M",
    causes: ["Autoimmune", "Genetics", "Environmental factors", "Infections"],
    treatment: ["Disease-modifying therapies", "Corticosteroids", "Physical therapy", "Symptom management"],
    prevention: ["No known prevention", "Vitamin D", "Healthy lifestyle", "Avoid smoking"],
  },
  {
    name: "Malaria",
    category: "Infectious",
    severity: "Serious",
    symptoms: ["Fever", "Chills", "Headache", "Nausea", "Vomiting", "Muscle aches"],
    description: "A life-threatening disease caused by parasites transmitted through infected mosquito bites.",
    prevalence: "Common",
    letter: "M",
    causes: ["Plasmodium parasites", "Anopheles mosquito bites"],
    treatment: ["Antimalarial medications", "Supportive care", "Hospitalization if severe"],
    prevention: ["Antimalarial drugs", "Mosquito nets", "Insect repellent", "Protective clothing"],
  },
  {
    name: "Melanoma",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Changing moles", "New growths", "Irregular borders", "Color variations", "Bleeding"],
    description: "The most serious type of skin cancer that develops in melanocytes.",
    prevalence: "Uncommon",
    letter: "M",
    causes: ["UV radiation", "Genetics", "Fair skin", "Many moles", "Weakened immune system"],
    treatment: ["Surgery", "Immunotherapy", "Targeted therapy", "Chemotherapy", "Radiation therapy"],
    prevention: ["Sun protection", "Avoid tanning beds", "Regular skin checks", "Protective clothing"],
  },
  // N
  {
    name: "Neuropathy",
    category: "Neurological",
    severity: "Moderate",
    symptoms: ["Numbness", "Tingling", "Pain", "Weakness", "Sensitivity to touch", "Muscle weakness"],
    description: "Damage to the peripheral nerves, often causing weakness, numbness and pain.",
    prevalence: "Common",
    letter: "N",
    causes: ["Diabetes", "Infections", "Autoimmune diseases", "Medications", "Trauma"],
    treatment: ["Pain medications", "Antidepressants", "Anti-seizure drugs", "Physical therapy"],
    prevention: ["Control diabetes", "Avoid toxins", "Exercise regularly", "Eat healthy diet"],
  },
  // O
  {
    name: "Osteoporosis",
    category: "Musculoskeletal",
    severity: "Serious",
    symptoms: ["Bone fractures", "Back pain", "Loss of height", "Stooped posture", "Easily broken bones"],
    description: "A bone disease that occurs when the body loses too much bone or makes too little bone.",
    prevalence: "Common",
    letter: "O",
    causes: ["Age", "Hormonal changes", "Calcium deficiency", "Sedentary lifestyle", "Medications"],
    treatment: ["Bisphosphonates", "Hormone therapy", "Calcium supplements", "Vitamin D"],
    prevention: ["Calcium-rich diet", "Vitamin D", "Regular exercise", "Avoid smoking"],
  },
  {
    name: "Obesity",
    category: "Endocrine",
    severity: "Serious",
    symptoms: ["Excess weight", "Difficulty breathing", "Sleep apnea", "Joint pain", "High blood pressure"],
    description: "A complex disease involving an excessive amount of body fat.",
    prevalence: "Very Common",
    letter: "O",
    causes: ["Genetics", "Overeating", "Sedentary lifestyle", "Medical conditions", "Medications"],
    treatment: ["Diet changes", "Exercise", "Behavioral therapy", "Medications", "Surgery"],
    prevention: ["Healthy diet", "Regular exercise", "Portion control", "Lifestyle changes"],
  },
  {
    name: "Ovarian Cancer",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Abdominal bloating", "Pelvic pain", "Feeling full quickly", "Urinary symptoms", "Fatigue"],
    description: "Cancer that begins in the ovaries, often called the 'silent killer' due to subtle symptoms.",
    prevalence: "Uncommon",
    letter: "O",
    causes: ["Age", "Genetics", "Family history", "Reproductive history", "Hormone therapy"],
    treatment: ["Surgery", "Chemotherapy", "Targeted therapy", "Hormone therapy"],
    prevention: ["Oral contraceptives", "Pregnancy", "Breastfeeding", "Genetic counseling"],
  },
  // P
  {
    name: "Pneumonia",
    category: "Respiratory",
    severity: "Serious",
    symptoms: ["Chest pain", "Cough with phlegm", "Fever", "Difficulty breathing", "Fatigue", "Nausea"],
    description: "An infection that inflames air sacs in one or both lungs.",
    prevalence: "Common",
    letter: "P",
    causes: ["Bacteria", "Viruses", "Fungi", "Aspiration", "Hospital-acquired"],
    treatment: ["Antibiotics", "Antiviral medications", "Rest", "Fluids", "Oxygen therapy"],
    prevention: ["Vaccination", "Hand hygiene", "Don't smoke", "Healthy lifestyle"],
  },
  {
    name: "Psoriasis",
    category: "Dermatological",
    severity: "Moderate",
    symptoms: ["Red patches", "Silvery scales", "Itching", "Burning", "Thick nails", "Joint pain"],
    description: "A skin disease that causes red, itchy scaly patches, most commonly on knees and elbows.",
    prevalence: "Common",
    letter: "P",
    causes: ["Immune system", "Genetics", "Environmental triggers", "Stress", "Infections"],
    treatment: ["Topical treatments", "Light therapy", "Oral medications", "Biologics"],
    prevention: ["Avoid triggers", "Manage stress", "Moisturize skin", "Healthy lifestyle"],
  },
  {
    name: "Parkinson's Disease",
    category: "Neurological",
    severity: "Serious",
    symptoms: ["Tremor", "Slow movement", "Rigid muscles", "Impaired posture", "Speech changes"],
    description: "A progressive nervous system disorder that affects movement.",
    prevalence: "Common",
    letter: "P",
    causes: ["Age", "Genetics", "Environmental factors", "Gender"],
    treatment: ["Medications", "Deep brain stimulation", "Physical therapy", "Speech therapy"],
    prevention: ["Regular exercise", "Healthy diet", "Avoid toxins", "Stay mentally active"],
  },
  {
    name: "Prostate Cancer",
    category: "Oncological",
    severity: "Serious",
    symptoms: ["Urinary problems", "Blood in urine", "Erectile dysfunction", "Bone pain", "Weight loss"],
    description: "Cancer that occurs in the prostate, a small walnut-shaped gland in men.",
    prevalence: "Very Common",
    letter: "P",
    causes: ["Age", "Race", "Family history", "Obesity", "Diet"],
    treatment: ["Surgery", "Radiation therapy", "Hormone therapy", "Chemotherapy", "Immunotherapy"],
    prevention: ["Healthy diet", "Regular exercise", "Maintain healthy weight", "Regular screening"],
  },
  // Q
  {
    name: "Quinsy",
    category: "Infectious",
    severity: "Moderate",
    symptoms: ["Severe sore throat", "Difficulty swallowing", "Fever", "Drooling", "Muffled voice"],
    description: "A complication of tonsillitis where an abscess forms beside the tonsil.",
    prevalence: "Uncommon",
    letter: "Q",
    causes: ["Bacterial infection", "Untreated tonsillitis", "Poor oral hygiene"],
    treatment: ["Antibiotics", "Drainage", "Pain relief", "Hospitalization if severe"],
    prevention: ["Good oral hygiene", "Treat throat infections promptly", "Boost immunity"],
  },
  // R
  {
    name: "Rheumatoid Arthritis",
    category: "Autoimmune",
    severity: "Serious",
    symptoms: ["Joint pain", "Swelling", "Stiffness", "Fatigue", "Fever", "Weight loss"],
    description: "An autoimmune disorder that primarily affects joints causing painful swelling.",
    prevalence: "Common",
    letter: "R",
    causes: ["Autoimmune", "Genetics", "Environmental factors", "Smoking"],
    treatment: ["DMARDs", "Biologics", "Corticosteroids", "Physical therapy"],
    prevention: ["Don't smoke", "Maintain healthy weight", "Exercise regularly", "Manage stress"],
  },
  {
    name: "Rosacea",
    category: "Dermatological",
    severity: "Mild",
    symptoms: ["Facial redness", "Swollen red bumps", "Eye problems", "Enlarged nose", "Burning sensation"],
    description: "A common skin condition that causes redness and visible blood vessels in the face.",
    prevalence: "Common",
    letter: "R",
    causes: ["Genetics", "Environmental factors", "Blood vessel abnormalities", "Demodex mites"],
    treatment: ["Topical medications", "Oral antibiotics", "Laser therapy", "Lifestyle changes"],
    prevention: ["Identify triggers", "Sun protection", "Gentle skincare", "Avoid irritants"],
  },
  // S
  {
    name: "Sinusitis",
    category: "Respiratory",
    severity: "Mild",
    symptoms: ["Facial pain", "Nasal congestion", "Thick nasal discharge", "Reduced smell", "Headache"],
    description: "Inflammation or swelling of the tissue lining the sinuses.",
    prevalence: "Very Common",
    letter: "S",
    causes: ["Viral infections", "Bacterial infections", "Allergies", "Nasal polyps"],
    treatment: ["Decongestants", "Nasal sprays", "Antibiotics", "Pain relievers"],
    prevention: ["Avoid allergens", "Hand hygiene", "Use humidifier", "Stay hydrated"],
  },
  {
    name: "Stroke",
    category: "Cardiovascular",
    severity: "Serious",
    symptoms: ["Sudden numbness", "Confusion", "Trouble speaking", "Vision problems", "Severe headache"],
    description: "Occurs when blood supply to part of the brain is interrupted or reduced.",
    prevalence: "Common",
    letter: "S",
    causes: ["Blood clots", "Bleeding", "High blood pressure", "Diabetes", "Heart disease"],
    treatment: ["Clot-busting drugs", "Surgery", "Rehabilitation", "Medications"],
    prevention: ["Control blood pressure", "Don't smoke", "Exercise", "Healthy diet"],
  },
  {
    name: "Sleep Apnea",
    category: "Sleep Disorders",
    severity: "Serious",
    symptoms: ["Loud snoring", "Gasping during sleep", "Daytime sleepiness", "Morning headaches", "Irritability"],
    description: "A serious sleep disorder in which breathing repeatedly stops and starts during sleep.",
    prevalence: "Common",
    letter: "S",
    causes: ["Obesity", "Age", "Gender", "Family history", "Smoking"],
    treatment: ["CPAP therapy", "Oral appliances", "Surgery", "Lifestyle changes"],
    prevention: ["Maintain healthy weight", "Exercise regularly", "Avoid alcohol", "Sleep on side"],
  },
  {
    name: "Schizophrenia",
    category: "Mental Health",
    severity: "Serious",
    symptoms: ["Delusions", "Hallucinations", "Disorganized thinking", "Abnormal motor behavior", "Negative symptoms"],
    description: "A chronic brain disorder that affects how a person thinks, feels, and behaves.",
    prevalence: "Uncommon",
    letter: "S",
    causes: ["Genetics", "Brain chemistry", "Environmental factors", "Drug use"],
    treatment: ["Antipsychotic medications", "Psychotherapy", "Social skills training", "Rehabilitation"],
    prevention: ["No known prevention", "Avoid drug use", "Manage stress", "Early intervention"],
  },
  // T
  {
    name: "Tuberculosis",
    category: "Infectious",
    severity: "Serious",
    symptoms: ["Persistent cough", "Weight loss", "Fatigue", "Fever", "Night sweats", "Chest pain"],
    description: "A potentially serious infectious disease that mainly affects the lungs.",
    prevalence: "Common",
    letter: "T",
    causes: ["Mycobacterium tuberculosis", "Airborne transmission", "Weakened immunity"],
    treatment: ["Antibiotics", "Directly observed therapy", "Isolation", "Nutritional support"],
    prevention: ["BCG vaccination", "Avoid close contact", "Good ventilation", "Treat latent TB"],
  },
  {
    name: "Thyroid Disorders",
    category: "Endocrine",
    severity: "Moderate",
    symptoms: ["Weight changes", "Fatigue", "Heart rate changes", "Temperature sensitivity", "Mood changes"],
    description: "Conditions that affect the thyroid gland's hormone production.",
    prevalence: "Common",
    letter: "T",
    causes: ["Autoimmune diseases", "Iodine deficiency", "Genetics", "Medications"],
    treatment: ["Hormone replacement", "Anti-thyroid medications", "Radioactive iodine", "Surgery"],
    prevention: ["Adequate iodine", "Regular checkups", "Healthy lifestyle", "Avoid smoking"],
  },
  {
    name: "Tinnitus",
    category: "ENT",
    severity: "Mild",
    symptoms: ["Ringing in ears", "Buzzing sounds", "Hissing", "Clicking", "Hearing loss"],
    description: "The perception of noise or ringing in the ears when no external sound is present.",
    prevalence: "Common",
    letter: "T",
    causes: ["Hearing loss", "Ear infections", "Medications", "Blood vessel disorders", "TMJ disorders"],
    treatment: ["Hearing aids", "Sound therapy", "Medications", "Counseling"],
    prevention: ["Protect hearing", "Avoid loud noises", "Clean ears properly", "Manage stress"],
  },
  // U
  {
    name: "Ulcerative Colitis",
    category: "Digestive",
    severity: "Serious",
    symptoms: ["Diarrhea with blood", "Abdominal pain", "Urgency", "Weight loss", "Fatigue"],
    description: "An inflammatory bowel disease that causes inflammation in the digestive tract.",
    prevalence: "Uncommon",
    letter: "U",
    causes: ["Immune system", "Genetics", "Environmental factors"],
    treatment: ["Anti-inflammatory drugs", "Immunosuppressants", "Biologics", "Surgery"],
    prevention: ["No known prevention", "Stress management", "Healthy diet", "Regular monitoring"],
  },
  {
    name: "Urinary Tract Infection",
    category: "Urological",
    severity: "Mild",
    symptoms: ["Burning urination", "Frequent urination", "Cloudy urine", "Pelvic pain", "Strong urine odor"],
    description: "An infection in any part of the urinary system including kidneys, bladder, or urethra.",
    prevalence: "Very Common",
    letter: "U",
    causes: ["Bacterial infection", "Poor hygiene", "Sexual activity", "Catheter use"],
    treatment: ["Antibiotics", "Pain relievers", "Increased fluids", "Cranberry products"],
    prevention: ["Stay hydrated", "Good hygiene", "Urinate after sex", "Avoid irritants"],
  },
  {
    name: "Uterine Fibroids",
    category: "Gynecological",
    severity: "Moderate",
    symptoms: ["Heavy menstrual bleeding", "Pelvic pain", "Frequent urination", "Constipation", "Backache"],
    description: "Noncancerous growths of the uterus that often appear during childbearing years.",
    prevalence: "Common",
    letter: "U",
    causes: ["Hormones", "Genetics", "Growth factors", "Extracellular matrix"],
    treatment: ["Medications", "Noninvasive procedures", "Minimally invasive procedures", "Surgery"],
    prevention: ["No known prevention", "Maintain healthy weight", "Exercise regularly", "Eat vegetables"],
  },
  // V
  {
    name: "Varicose Veins",
    category: "Cardiovascular",
    severity: "Mild",
    symptoms: ["Visible twisted veins", "Leg pain", "Swelling", "Heaviness", "Skin changes"],
    description: "Enlarged, twisted veins that usually occur on the legs and feet.",
    prevalence: "Common",
    letter: "V",
    causes: ["Weak valves", "Age", "Pregnancy", "Obesity", "Standing for long periods"],
    treatment: ["Compression stockings", "Sclerotherapy", "Laser therapy", "Surgery"],
    prevention: ["Exercise regularly", "Maintain healthy weight", "Elevate legs", "Avoid long standing"],
  },
  {
    name: "Vertigo",
    category: "ENT",
    severity: "Moderate",
    symptoms: ["Spinning sensation", "Balance problems", "Nausea", "Vomiting", "Headache"],
    description: "A sensation of feeling off balance, often caused by inner ear problems.",
    prevalence: "Common",
    letter: "V",
    causes: ["Inner ear disorders", "Head injury", "Medications", "Migraines", "Brain problems"],
    treatment: ["Medications", "Physical therapy", "Canalith repositioning", "Surgery"],
    prevention: ["Avoid sudden movements", "Stay hydrated", "Get adequate sleep", "Manage stress"],
  },
  // W
  {
    name: "Whooping Cough",
    category: "Infectious",
    severity: "Moderate",
    symptoms: ["Severe coughing fits", "Whooping sound", "Vomiting", "Exhaustion", "Fever"],
    description: "A highly contagious respiratory tract infection marked by severe coughing spells.",
    prevalence: "Uncommon",
    letter: "W",
    causes: ["Bordetella pertussis bacteria", "Airborne transmission"],
    treatment: ["Antibiotics", "Supportive care", "Hospitalization if severe"],
    prevention: ["Vaccination", "Avoid close contact", "Good hygiene", "Booster shots"],
  },
  // X
  {
    name: "Xerostomia",
    category: "Oral Health",
    severity: "Mild",
    symptoms: ["Dry mouth", "Thick saliva", "Bad breath", "Difficulty swallowing", "Mouth sores"],
    description: "A condition in which the salivary glands don't make enough saliva to keep the mouth wet.",
    prevalence: "Common",
    letter: "X",
    causes: ["Medications", "Medical treatments", "Diseases", "Nerve damage"],
    treatment: ["Saliva substitutes", "Medications", "Oral rinses", "Lifestyle changes"],
    prevention: ["Stay hydrated", "Avoid tobacco", "Limit caffeine", "Use humidifier"],
  },
  // Y
  {
    name: "Yellow Fever",
    category: "Infectious",
    severity: "Serious",
    symptoms: ["Fever", "Headache", "Muscle aches", "Nausea", "Vomiting", "Jaundice"],
    description: "A viral infection spread by mosquitoes that can cause serious illness and death.",
    prevalence: "Rare",
    letter: "Y",
    causes: ["Yellow fever virus", "Aedes mosquito bites"],
    treatment: ["Supportive care", "Fluid replacement", "Pain relief", "Hospitalization"],
    prevention: ["Vaccination", "Mosquito control", "Use repellents", "Protective clothing"],
  },
  // Z
  {
    name: "Zika Virus",
    category: "Infectious",
    severity: "Mild",
    symptoms: ["Fever", "Rash", "Joint pain", "Red eyes", "Headache", "Muscle pain"],
    description: "A mosquito-borne viral infection that can cause birth defects if contracted during pregnancy.",
    prevalence: "Rare",
    letter: "Z",
    causes: ["Zika virus", "Aedes mosquito bites", "Sexual transmission"],
    treatment: ["Supportive care", "Rest", "Fluids", "Pain relievers"],
    prevention: ["Mosquito control", "Use repellents", "Safe sex", "Avoid travel to affected areas"],
  },
]

const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

const severityColors = {
  Mild: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
  Moderate:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
  Serious: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
}

interface DiseasesGridProps {
  selectedCategory: string | null
}

export function DiseasesGrid({ selectedCategory }: DiseasesGridProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [selectedDisease, setSelectedDisease] = useState<(typeof diseases)[0] | null>(null)

  const filteredDiseases = diseases.filter((disease) => {
    const matchesCategory = selectedCategory ? disease.category === selectedCategory : true
    const matchesLetter = selectedLetter ? disease.letter === selectedLetter : true
    return matchesCategory && matchesLetter
  })

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">
            {selectedCategory ? `${selectedCategory} Diseases` : "A-Z Disease Directory"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedCategory
              ? `Browse ${selectedCategory.toLowerCase()} conditions alphabetically`
              : "Browse diseases alphabetically or search by letter"}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedLetter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLetter(null)}
            className={selectedLetter === null ? "bg-emerald-600 hover:bg-emerald-700" : ""}
          >
            All
          </Button>
          {alphabetLetters.map((letter) => {
            const hasDisease = diseases.some((disease) => {
              const matchesCategory = selectedCategory ? disease.category === selectedCategory : true
              return disease.letter === letter && matchesCategory
            })
            return (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                size="sm"
                disabled={!hasDisease}
                onClick={() => setSelectedLetter(letter)}
                className={`${
                  selectedLetter === letter ? "bg-emerald-600 hover:bg-emerald-700" : ""
                } ${!hasDisease ? "opacity-50" : ""}`}
              >
                {letter}
              </Button>
            )
          })}
        </div>

        {(selectedCategory || selectedLetter) && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {selectedCategory && (
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
              >
                Category: {selectedCategory}
              </Badge>
            )}
            {selectedLetter && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Letter: {selectedLetter}
              </Badge>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-all duration-300 hover:shadow-lg border-0 shadow-md"
              onClick={() => setSelectedDisease(disease)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-display text-xl text-gray-900 dark:text-white">{disease.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {disease.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={severityColors[disease.severity as keyof typeof severityColors]}>
                    {disease.severity}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {disease.prevalence}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {disease.description}
                </CardDescription>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Common Symptoms:</h4>
                  <div className="flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 3).map((symptom, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{disease.symptoms.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No diseases found
              {selectedCategory && ` in ${selectedCategory} category`}
              {selectedLetter && ` for letter "${selectedLetter}"`}
            </p>
            <div className="flex gap-2 justify-center mt-4">
              {selectedCategory && (
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Clear Category Filter
                </Button>
              )}
              {selectedLetter && (
                <Button variant="outline" onClick={() => setSelectedLetter(null)}>
                  Clear Letter Filter
                </Button>
              )}
            </div>
          </div>
        )}

        {selectedDisease && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-display text-2xl text-gray-900 dark:text-white mb-2">
                      {selectedDisease.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{selectedDisease.category}</Badge>
                      <Badge className={severityColors[selectedDisease.severity as keyof typeof severityColors]}>
                        {selectedDisease.severity}
                      </Badge>
                      <Badge variant="secondary">{selectedDisease.prevalence}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDisease(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedDisease.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Symptoms</h3>
                    <div className="space-y-2">
                      {selectedDisease.symptoms.map((symptom, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Common Causes</h3>
                    <div className="space-y-2">
                      {selectedDisease.causes?.map((cause, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Treatment Options</h3>
                    <div className="space-y-2">
                      {selectedDisease.treatment?.map((treatment, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Prevention</h3>
                    <div className="space-y-2">
                      {selectedDisease.prevention?.map((prevention, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{prevention}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">Find Specialists</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Learn More
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Download Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
