import django
from django.db import IntegrityError
from django.utils.timezone import now

import os

from datetime import timedelta

def set_environment():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prime_biz_crm_backend.settings')
    django.setup()

def create_users():
    users_data = [
        {"username": "BusinessStrategist", "email": "strategist@example.com", "password": "bs123!", "is_active": True, "is_staff": True},
        {"username": "ClientRelationsPro", "email": "relations@example.com", "password": "crp123!", "is_active": True, "is_staff": True},
        {"username": "RevenueLeader", "email": "revenue@example.com", "password": "rl123!", "is_active": True, "is_staff": True}
    ]

    for user_data in users_data:
        user, created = CustomUser.objects.get_or_create(
            username=user_data["username"],
            email=user_data["email"],
            defaults={
                "is_active": user_data["is_active"],
                "is_staff": user_data["is_staff"],
            }
        )
        
        if created:
            user.set_password(user_data['password'])
            user.save()
            print(f'✅ User: {user.username} was created.')
        else:
            print(f'⚠️ User: {user.username} already exists.')

def create_leads():
    leads_data = [
        {"company_name": "Alpha Corp", "contact_person_name": "John", "contact_person_surname": "Doe", "email": "alpha@example.com", "phone": "+1234567890", "industry": "Manufacturing", "size": "Small", "top_lead": False, "notes": "Potential client", "converted_to_pipeline": True, "created_by": 1},
        {"company_name": "Beta LLC", "contact_person_name": "Jane", "contact_person_surname": "Smith", "email": "beta@example.com", "phone": "+1234567891", "industry": "Retail", "size": "Medium", "top_lead": True, "notes": "VIP client", "converted_to_pipeline": True, "created_by": 1},
        {"company_name": "Gamma Ltd", "contact_person_name": "Alice", "contact_person_surname": "Johnson", "email": "gamma@example.com", "phone": "+1234567892", "industry": "Services", "size": "Big", "top_lead": False, "notes": "Needs follow-up", "converted_to_pipeline": True, "created_by": 1},
        {"company_name": "Delta Inc", "contact_person_name": "Robert", "contact_person_surname": "Brown", "email": "delta@example.com", "phone": "+1234567893", "industry": "Other", "size": "Small", "top_lead": True, "notes": "Interested", "converted_to_pipeline": False, "created_by": 1},
        {"company_name": "Epsilon Co", "contact_person_name": "Michael", "contact_person_surname": "White", "email": "epsilon@example.com", "phone": "+1234567894", "industry": "Manufacturing", "size": "Medium", "top_lead": False, "notes": "Might convert", "converted_to_pipeline": True, "created_by": 1},
        {"company_name": "Zeta Group", "contact_person_name": "Laura", "contact_person_surname": "Green", "email": "zeta@example.com", "phone": "+1234567895", "industry": "Retail", "size": "Big", "top_lead": True, "notes": "Priority", "converted_to_pipeline": False, "created_by": 1},
        {"company_name": "Eta Solutions", "contact_person_name": "David", "contact_person_surname": "Black", "email": "eta@example.com", "phone": "+1234567896", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Pending response", "converted_to_pipeline": False, "created_by": 1},
        {"company_name": "Theta Systems", "contact_person_name": "Emma", "contact_person_surname": "Blue", "email": "theta@example.com", "phone": "+1234567897", "industry": "Other", "size": "Medium", "top_lead": True, "notes": "In discussion", "converted_to_pipeline": True, "created_by": 1},
        {"company_name": "Iota Innovations", "contact_person_name": "William", "contact_person_surname": "Gray", "email": "iota@example.com", "phone": "+1234567898", "industry": "Manufacturing", "size": "Big", "top_lead": False, "notes": "Negotiating", "converted_to_pipeline": False, "created_by": 1},
        {"company_name": "Kappa Enterprises", "contact_person_name": "Olivia", "contact_person_surname": "Red", "email": "kappa@example.com", "phone": "+1234567899", "industry": "Retail", "size": "Small", "top_lead": True, "notes": "High potential", "converted_to_pipeline": False, "created_by": 1},
        {"company_name": "Lambda Corp", "contact_person_name": "Jack", "contact_person_surname": "Brown", "email": "lambda@example.com", "phone": "+2234567890", "industry": "Services", "size": "Big", "top_lead": True, "notes": "Good prospect", "converted_to_pipeline": True, "created_by": 2},
        {"company_name": "Mu LLC", "contact_person_name": "Sophia", "contact_person_surname": "Green", "email": "mu@example.com", "phone": "+2234567891", "industry": "Other", "size": "Small", "top_lead": False, "notes": "Follow-up needed", "converted_to_pipeline": True, "created_by": 2},
        {"company_name": "Nu Ltd", "contact_person_name": "Henry", "contact_person_surname": "Johnson", "email": "nu@example.com", "phone": "+2234567892", "industry": "Manufacturing", "size": "Medium", "top_lead": True, "notes": "Potential deal", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Xi Inc", "contact_person_name": "Ethan", "contact_person_surname": "White", "email": "xi@example.com", "phone": "+2234567893", "industry": "Retail", "size": "Big", "top_lead": False, "notes": "Needs consultation", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Omicron Co", "contact_person_name": "Charlotte", "contact_person_surname": "Blue", "email": "omicron@example.com", "phone": "+2234567894", "industry": "Services", "size": "Small", "top_lead": True, "notes": "In process", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Pi Group", "contact_person_name": "James", "contact_person_surname": "Black", "email": "pi@example.com", "phone": "+2234567895", "industry": "Other", "size": "Medium", "top_lead": False, "notes": "Considering options", "converted_to_pipeline": True, "created_by": 2},
        {"company_name": "Rho Solutions", "contact_person_name": "Isabella", "contact_person_surname": "Gray", "email": "rho@example.com", "phone": "+2234567896", "industry": "Manufacturing", "size": "Big", "top_lead": False, "notes": "High interest", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Sigma Systems", "contact_person_name": "Mia", "contact_person_surname": "Red", "email": "sigma@example.com", "phone": "+2234567897", "industry": "Retail", "size": "Small", "top_lead": False, "notes": "Early contact", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Tau Innovations", "contact_person_name": "Alexander", "contact_person_surname": "Pink", "email": "tau@example.com", "phone": "+2234567898", "industry": "Services", "size": "Medium", "top_lead": True, "notes": "Ready for proposal", "converted_to_pipeline": True, "created_by": 2},
        {"company_name": "Upsilon Enterprises", "contact_person_name": "Ava", "contact_person_surname": "Orange", "email": "upsilon@example.com", "phone": "+2234567899", "industry": "Other", "size": "Big", "top_lead": False, "notes": "Pending review", "converted_to_pipeline": False, "created_by": 2},
        {"company_name": "Vega Corp", "contact_person_name": "Daniel", "contact_person_surname": "Carter", "email": "vega@example.com", "phone": "+3234567890", "industry": "Retail", "size": "Big", "top_lead": True, "notes": "Negotiating contract", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Omega Solutions", "contact_person_name": "Sarah", "contact_person_surname": "Harris", "email": "omega@example.com", "phone": "+3234567891", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Potential upsell", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Delta Enterprises", "contact_person_name": "Liam", "contact_person_surname": "Walker", "email": "delta.ent@example.com", "phone": "+3234567892", "industry": "Manufacturing", "size": "Medium", "top_lead": False, "notes": "VIP client", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Sigma Co", "contact_person_name": "Emma", "contact_person_surname": "Lopez", "email": "sigma.co@example.com", "phone": "+3234567893", "industry": "Other", "size": "Big", "top_lead": False, "notes": "New lead, cold call", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Kappa Industries", "contact_person_name": "Noah", "contact_person_surname": "Young", "email": "kappa.industries@example.com", "phone": "+3234567894", "industry": "Retail", "size": "Medium", "top_lead": False, "notes": "Strong interest", "converted_to_pipeline": True, "created_by": 3},
        {"company_name": "Theta Logistics", "contact_person_name": "Olivia", "contact_person_surname": "King", "email": "theta.logistics@example.com", "phone": "+3234567895", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Meeting scheduled", "converted_to_pipeline": True, "created_by": 3},
        {"company_name": "Lambda Tech", "contact_person_name": "William", "contact_person_surname": "Scott", "email": "lambda.tech@example.com", "phone": "+3234567896", "industry": "Manufacturing", "size": "Big", "top_lead": True, "notes": "Strategic partner", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Nu Consulting", "contact_person_name": "James", "contact_person_surname": "Nelson", "email": "nu.consulting@example.com", "phone": "+3234567897", "industry": "Other", "size": "Small", "top_lead": False, "notes": "Awaiting proposal", "converted_to_pipeline": False, "created_by": 3},
        {"company_name": "Omicron Digital", "contact_person_name": "Sophia", "contact_person_surname": "Mitchell", "email": "omicron.digital@example.com", "phone": "+3234567898", "industry": "Retail", "size": "Medium", "top_lead": True, "notes": "High potential deal", "converted_to_pipeline": True, "created_by": 3},
        {"company_name": "Rho Ventures", "contact_person_name": "Benjamin", "contact_person_surname": "Perez", "email": "rho.ventures@example.com", "phone": "+3234567899", "industry": "Services", "size": "Big", "top_lead": False, "notes": "Exploring collaboration", "converted_to_pipeline": False, "created_by": 3}
    ]

    leads_to_create = []

    for lead_data in leads_data:
        lead_to_create = Lead(
            company_name=lead_data["company_name"],
            contact_person_name=lead_data["contact_person_name"],
            contact_person_surname=lead_data["contact_person_surname"],
            email=lead_data["email"],
            phone=lead_data["phone"],
            industry=lead_data["industry"],
            size=lead_data["size"],
            top_lead=lead_data["top_lead"],
            notes=lead_data["notes"],
            converted_to_pipeline=lead_data["converted_to_pipeline"],
            created_by_id=lead_data["created_by"],
        )
        leads_to_create.append(lead_to_create)

    try:
        Lead.objects.bulk_create(leads_to_create)
        print(f"✅ Successfully created {len(leads_to_create)} leads.")
    except IntegrityError as e:
        print(f"❌ Error occurred: {e}")

def create_pipelines():
    pipelines_data = [
        {"lead_id": 1, "deal_name": "Cloud Infrastructure Overhaul", "expected_value": 350000.00, "stage": "Prospecting", "created_by_id": 1},
        {"lead_id": 2, "deal_name": "Premium Engine Components Deal", "expected_value": 500000.00, "stage": "Prospecting", "created_by_id": 1},
        {"lead_id": 3, "deal_name": "Business-Class Laptop Deployment", "expected_value": 250000.00, "stage": "Prospecting", "created_by_id": 1},
        {"lead_id": 4, "deal_name": "Customized Workstations for Teams", "expected_value": 420000.00, "stage": "Prospecting", "created_by_id": 1},
        {"lead_id": 5, "deal_name": "Data Recovery & Backup Solutions", "expected_value": 180000.00, "stage": "Prospecting", "created_by_id": 1},
        {"lead_id": 6, "deal_name": "Suspension Upgrade Kit", "expected_value": 300000.00, "stage": "Negotiation", "created_by_id": 1},
        {"lead_id": 7, "deal_name": "Anti-Glare Glasses for Professionals", "expected_value": 120000.00, "stage": "Negotiation", "created_by_id": 1},
        {"lead_id": 8, "deal_name": "Next-Gen Server Deployment", "expected_value": 450000.00, "stage": "Negotiation", "created_by_id": 1},
        {"lead_id": 9, "deal_name": "Work-from-Home Laptop Bundle", "expected_value": 220000.00, "stage": "Proposal Sent", "created_by_id": 1},
        {"lead_id": 10, "deal_name": "Comprehensive Coverage Plan", "expected_value": 150000.00, "stage": "Won", "created_by_id": 1},
        {"lead_id": 11, "deal_name": "Digital Transformation Partnership", "expected_value": 1800000.00, "stage": "Negotiation", "created_by_id": 2},
        {"lead_id": 12, "deal_name": "Alloy Wheels & Tires Package", "expected_value": 80000.00, "stage": "Prospecting", "created_by_id": 2},
        {"lead_id": 13, "deal_name": "Enterprise Networking Equipment", "expected_value": 380000.00, "stage": "Proposal Sent", "created_by_id": 2},
        {"lead_id": 14, "deal_name": "Strategic Seat Belt Retrofit Kit", "expected_value": 220000.00, "stage": "Prospecting", "created_by_id": 2},
        {"lead_id": 15, "deal_name": "Impact-Resistant Glasses Offer", "expected_value": 120000.00, "stage": "Proposal Sent", "created_by_id": 2},
        {"lead_id": 16, "deal_name": "Customized Auto Insurance Deal", "expected_value": 250000.00, "stage": "Prospecting", "created_by_id": 2},
        {"lead_id": 17, "deal_name": "Premium Vehicle Protection", "expected_value": 400000.00, "stage": "Prospecting", "created_by_id": 2},
        {"lead_id": 18, "deal_name": "High-Performance Car Seat Belts", "expected_value": 170000.00, "stage": "Negotiation", "created_by_id": 2},
        {"lead_id": 19, "deal_name": "Negotiating contract for Car Insurance", "expected_value": 290000.00, "stage": "Negotiation", "created_by_id": 2},
        {"lead_id": 20, "deal_name": "Workplace Safety Seat Belts Package", "expected_value": 130000.00, "stage": "Prospecting", "created_by_id": 2},
        {"lead_id": 21, "deal_name": "Premium Seat Belt Solutions", "expected_value": 380000.00, "stage": "Prospecting", "created_by_id": 3},
        {"lead_id": 22, "deal_name": "Strategic Partner for Data Security", "expected_value": 220000.00, "stage": "Negotiation", "created_by_id": 3},
        {"lead_id": 23, "deal_name": "High-Performance Workstation Deal", "expected_value": 2700000.00, "stage": "Prospecting", "created_by_id": 3},
        {"lead_id": 24, "deal_name": "Negotiating contract for Laptops", "expected_value": 350000.00, "stage": "Negotiation", "created_by_id": 3},
        {"lead_id": 25, "deal_name": "Custom IT Equipment Package", "expected_value": 450000.00, "stage": "Prospecting", "created_by_id": 3},
        {"lead_id": 26, "deal_name": "Cloud Infrastructure Setup for Logistics", "expected_value": 280000.00, "stage": "Prospecting", "created_by_id": 3},
        {"lead_id": 27, "deal_name": "Next-Gen Server Deal", "expected_value": 500000.00, "stage": "Negotiation", "created_by_id": 3},
        {"lead_id": 28, "deal_name": "Comprehensive Consulting Package", "expected_value": 180000.00, "stage": "Proposal Sent", "created_by_id": 3},
        {"lead_id": 29, "deal_name": "Digital Transformation Solutions", "expected_value": 250000.00, "stage": "Won", "created_by_id": 3},
        {"lead_id": 30, "deal_name": "Premium IT Support Contract", "expected_value": 2500000.00, "stage": "Proposal Sent", "created_by_id": 3},
    ]
    
    pipelines_to_create = []

    for pipeline_data in pipelines_data:
        try:
            lead = Lead.objects.get(id=pipeline_data['lead_id'])
        except Lead.DoesNotExist:
            print(f"❌ Error: Lead ID: {pipeline_data['lead_id']} does not exists! Skipping...")
            continue

        pipeline_to_create = Pipeline(
            lead=lead,
            deal_name=pipeline_data["deal_name"],
            expected_value=pipeline_data["expected_value"],
            stage=pipeline_data["stage"],
            created_by_id=pipeline_data["created_by_id"],
        )
        pipelines_to_create.append(pipeline_to_create)

    try:
        Pipeline.objects.bulk_create(pipelines_to_create)
        print(f"✅ Successfully created {len(pipelines_to_create)} pipelines.")
    except IntegrityError as e:
        print(f"❌ Error occurred: {e}")

def create_reminders():
    reminders_data = [
        {"user_id": 1, "title": "Follow-up with Alpha Corp", "description": "Check in with John Doe regarding the proposal.", "reminder_date": now() + timedelta(days=2)},
        {"user_id": 1, "title": "Send updated quote to Beta LLC", "description": "Prepare and send the revised quote to Jane Smith.", "reminder_date": now() + timedelta(days=3)},
        {"user_id": 1, "title": "Schedule meeting with Gamma Ltd", "description": "Arrange a meeting with Alice Johnson.", "reminder_date": now() + timedelta(days=5)},
        {"user_id": 1, "title": "Review Delta Inc contract", "description": "Go through the contract details before signing.", "reminder_date": now() + timedelta(days=7)},
        {"user_id": 2, "title": "Follow up with Lambda Corp", "description": "Discuss project scope with Jack Brown.", "reminder_date": now() + timedelta(days=1)},
        {"user_id": 2, "title": "Check progress with Mu LLC", "description": "See if Sophia Green has reviewed the offer.", "reminder_date": now() + timedelta(days=4)},
        {"user_id": 2, "title": "Confirm deal with Nu Ltd", "description": "Ensure Henry Johnson signs the agreement.", "reminder_date": now() + timedelta(days=6)},
        {"user_id": 3, "title": "Negotiate with Vega Corp", "description": "Finalize contract details with Daniel Carter.", "reminder_date": now() + timedelta(days=2)},
        {"user_id": 3, "title": "Prepare report for Omega Solutions", "description": "Summarize key points before meeting with Sarah Harris.", "reminder_date": now() + timedelta(days=5)},
    ]

    reminders_to_create = []

    for reminder_data in reminders_data:
        try:
            user = CustomUser.objects.get(id=reminder_data["user_id"])
        except CustomUser.DoesNotExist:
            print(f"❌ Błąd: Użytkownik o ID {reminder_data['user_id']} nie istnieje! Pomijam.")
            continue

        reminder_to_create = Reminder(
            user=user,
            title=reminder_data["title"],
            description=reminder_data["description"],
            reminder_date=reminder_data["reminder_date"],
        )
        reminders_to_create.append(reminder_to_create)

    try:
        Reminder.objects.bulk_create(reminders_to_create)
        print(f"✅ Successfully created {len(reminders_to_create)} reminders.")
    except IntegrityError as e:
        print(f"❌ Error occurred: {e}")

if __name__ == '__main__':
    set_environment()

    from prime_biz_crm.models import CustomUser, Lead, Pipeline, Reminder

    create_users()
    create_leads()
    create_pipelines()
    create_reminders()

    print("🎉 All data added to database.")
