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
        {"company_name": "Alpha Corp", "contact_person_name": "John", "contact_person_surname": "Doe", "email": "alpha@example.com", "phone": "+221234567890", "address": "Alpha Corp Ltd, Unit 12, Industrial Estate, 45 Manufacturing Road, Birmingham, B1 1AA, United Kingdom", "website": "https://www.alphacorp.com", "industry": "Manufacturing", "size": "Small", "top_lead": False, "notes": "Potential client", "converted_to_pipeline": True, "created_by": 1, "created_at": now()},
        {"company_name": "Beta LLC", "contact_person_name": "Jane", "contact_person_surname": "Smith", "email": "beta@example.com", "phone": "+221233217891", "address": "Beta LLC, Suite 4B, Retail Plaza, 78 High Street, Manchester, M2 5BX, United Kingdom", "website": "https://www.beta-llc.com", "industry": "Retail", "size": "Medium", "top_lead": True, "notes": "VIP client", "converted_to_pipeline": True, "created_by": 1, "created_at": now()},
        {"company_name": "Gamma Ltd", "contact_person_name": "Alice", "contact_person_surname": "Johnson", "email": "gamma@example.com", "phone": "+221213277891", "address": "Gamma Ltd, 2nd Floor, Business Hub, 15 Service Avenue, London, EC2V 7JE, United Kingdom", "website": "https://www.gamma-ltd.com", "industry": "Services", "size": "Big", "top_lead": False, "notes": "Needs follow-up", "converted_to_pipeline": True, "created_by": 1, "created_at": now()},
        {"company_name": "Delta Inc", "contact_person_name": "Robert", "contact_person_surname": "Brown", "email": "delta@example.com", "phone": "+221213277731", "address": "Delta Inc, Office 23, Commerce Centre, 99 Market Street, Bristol, BS1 3EH, United Kingdom", "website": "https://www.deltainc.com", "industry": "Other", "size": "Small", "top_lead": True, "notes": "Interested", "converted_to_pipeline": False, "created_by": 1, "created_at": now()},
        {"company_name": "Epsilon Co", "contact_person_name": "Michael", "contact_person_surname": "White", "email": "epsilon@example.com", "phone": "+221212177891", "address": "Epsilon Co, Unit 5, Manufacturing Park, 10 Factory Lane, Leeds, LS10 2BN, United Kingdom", "website": "", "industry": "Manufacturing", "size": "Medium", "top_lead": False, "notes": "Might convert", "converted_to_pipeline": True, "created_by": 1, "created_at": now() - timedelta(days=1)},
        {"company_name": "Zeta Group", "contact_person_name": "Laura", "contact_person_surname": "Green", "email": "zeta@example.com", "phone": "+221213567891", "address": "Zeta Group, 7th Floor, Retail House, 32 Shopping Lane, Edinburgh, EH1 1NG, United Kingdom", "website": "", "industry": "Retail", "size": "Big", "top_lead": True, "notes": "Priority", "converted_to_pipeline": False, "created_by": 1, "created_at": now() - timedelta(days=1)},
        {"company_name": "Eta Solutions", "contact_person_name": "David", "contact_person_surname": "Black", "email": "eta@example.com", "phone": "+221213277893", "address": "Eta Solutions, Ground Floor, Business Village, 18 Enterprise Way, Glasgow, G2 3LW, United Kingdom", "website": "", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Pending response", "converted_to_pipeline": False, "created_by": 1, "created_at": now() - timedelta(days=1)},
        {"company_name": "Theta Systems", "contact_person_name": "Emma", "contact_person_surname": "Blue", "email": "theta@example.com", "phone": "+221213277898", "address": "Theta Systems, Suite 11, Tech Park, 55 Innovation Drive, London, SE1 9BG, United Kingdom", "website": "https://www.thetasystems.com", "industry": "Other", "size": "Medium", "top_lead": True, "notes": "In discussion", "converted_to_pipeline": True, "created_by": 1, "created_at": now() - timedelta(days=1)},
        {"company_name": "Iota Innovations", "contact_person_name": "William", "contact_person_surname": "Gray", "email": "iota@example.com", "phone": "+221232277898", "address": "Iota Innovations, Unit 21, Manufacturing Estate, 12 Industrial Road, Liverpool, L3 5PY, United Kingdom", "website": "https://www.iotainnovations.com", "industry": "Manufacturing", "size": "Big", "top_lead": False, "notes": "Negotiating", "converted_to_pipeline": False, "created_by": 1, "created_at": now() - timedelta(days=1)},
        {"company_name": "Kappa Enterprises", "contact_person_name": "Olivia", "contact_person_surname": "Red", "email": "kappa@example.com", "phone": "+221271277898", "address": "Kappa Enterprises, 3rd Floor, Business Centre, 25 Retail Street, Nottingham, NG1 2ED, United Kingdom", "website": "", "industry": "Retail", "size": "Small", "top_lead": True, "notes": "High potential", "converted_to_pipeline": False, "created_by": 1, "created_at": now() - timedelta(days=2)},
        {"company_name": "Lambda Corp", "contact_person_name": "Jack", "contact_person_surname": "Brown", "email": "lambda@example.com", "phone": "+221213276898", "address": "Lambda Corp, Office 9, Tower Business Park, 14 Service Court, Sheffield, S1 4FW, United Kingdom", "website": "", "industry": "Services", "size": "Big", "top_lead": True, "notes": "Good prospect", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=2)},
        {"company_name": "Mu LLC", "contact_person_name": "Sophia", "contact_person_surname": "Green", "email": "mu@example.com", "phone": "+221213277898", "address": "Mu LLC, Unit 17, Commerce House, 29 Enterprise Avenue, Cardiff, CF10 4AB, United Kingdom", "website": "https://www.mu-llc.com", "industry": "Other", "size": "Small", "top_lead": False, "notes": "Follow-up needed", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=3)},
        {"company_name": "Nu Ltd", "contact_person_name": "Henry", "contact_person_surname": "Johnson", "email": "nu@example.com", "phone": "+221213277898", "address": "Nu Ltd, Office 6, Tech Incubator, 88 Innovation Street, Newcastle, NE1 5RQ, United Kingdom", "website": "", "industry": "Manufacturing", "size": "Medium", "top_lead": True, "notes": "Potential deal", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=3)},
        {"company_name": "Xi Inc", "contact_person_name": "Ethan", "contact_person_surname": "White", "email": "xi@example.com", "phone": "+221213277898", "address": "Xi Inc, Floor 2, Retail Tower, 36 Mall Road, Southampton, SO14 3FE, United Kingdom", "website": "", "industry": "Retail", "size": "Big", "top_lead": False, "notes": "Needs consultation", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=3)},
        {"company_name": "Omicron Co", "contact_person_name": "Charlotte", "contact_person_surname": "Blue", "email": "omicron@example.com", "phone": "+221213277898", "address": "Omicron Co, Office 8, Business Plaza, 20 Market Square, Leicester, LE2 7HE, United Kingdom", "website": "", "industry": "Services", "size": "Small", "top_lead": True, "notes": "In process", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=4)},
        {"company_name": "Pi Group", "contact_person_name": "James", "contact_person_surname": "Black", "email": "pi@example.com", "phone": "+221213277898", "address": "Pi Group, Unit 4, Tech Valley, 19 Digital Lane, Coventry, CV1 3JD, United Kingdom", "website": "https://www.pigroup.com", "industry": "Other", "size": "Medium", "top_lead": False, "notes": "Considering options", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=4)},
        {"company_name": "Rho Solutions", "contact_person_name": "Isabella", "contact_person_surname": "Gray", "email": "rho@example.com", "phone": "+221213277898", "address": "Rho Solutions, 1st Floor, Enterprise Centre, 45 Business Street, Belfast, BT1 2AA, United Kingdom", "website": "https://www.rhogroup.com", "industry": "Manufacturing", "size": "Big", "top_lead": False, "notes": "High interest", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=4)},
        {"company_name": "Sigma Systems", "contact_person_name": "Mia", "contact_person_surname": "Red", "email": "sigma@example.com", "phone": "+221213277898", "address": "Sigma Systems, Suite 3, Retail District, 52 High Road, Aberdeen, AB11 6FD, United Kingdom", "website": "https://www.sigma-systems.com", "industry": "Retail", "size": "Small", "top_lead": False, "notes": "Early contact", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=4)},
        {"company_name": "Tau Innovations", "contact_person_name": "Alexander", "contact_person_surname": "Pink", "email": "tau@example.com", "phone": "+221213277898", "address": "Tau Innovations, Office 15, Digital Hub, 77 Startup Avenue, Oxford, OX1 4LT, United Kingdom", "website": "https://www.tauinnovations.com", "industry": "Services", "size": "Medium", "top_lead": True, "notes": "Ready for proposal", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=5)},
        {"company_name": "Upsilon Enterprises", "contact_person_name": "Ava", "contact_person_surname": "Orange", "email": "upsilon@example.com", "phone": "+2234567899", "address": "Upsilon Enterprises, Unit 30, Corporate Park, 10 Enterprise Court, Cambridge, CB1 5EA, United Kingdom", "website": "", "industry": "Other", "size": "Big", "top_lead": False, "notes": "Pending review", "converted_to_pipeline": False, "created_by": 2, "created_at": now() - timedelta(days=5)},
        {"company_name": "Vega Corp", "contact_person_name": "Daniel", "contact_person_surname": "Carter", "email": "vega@example.com", "phone": "+3234567890", "address": "Vega Corp, Floor 5, Business Tower, 31 Commercial Road, Brighton, BN1 4DA, United Kingdom", "website": "", "industry": "Retail", "size": "Big", "top_lead": True, "notes": "Negotiating contract", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=5)},
        {"company_name": "Omega Solutions", "contact_person_name": "Sarah", "contact_person_surname": "Harris", "email": "omega@example.com", "phone": "+3234567891", "address": "Omega Solutions, Office 2B, Innovation Park, 22 Technology Way, Reading, RG1 8PP, United Kingdom", "website": "https://www.omega-solutions.com", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Potential upsell", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=5)},
        {"company_name": "Delta Enterprises", "contact_person_name": "Liam", "contact_person_surname": "Walker", "email": "delta.ent@example.com", "phone": "+3234567892", "address": "Delta Enterprises, Suite 12, Business Hub, 90 Commerce Street, Stoke-on-Trent, ST1 5QG, United Kingdom", "website": "", "industry": "Manufacturing", "size": "Medium", "top_lead": False, "notes": "VIP client", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=5)},
        {"company_name": "Sigma Co", "contact_person_name": "Emma", "contact_person_surname": "Lopez", "email": "sigma.co@example.com", "phone": "+3234567893", "address": "Sigma Co, Ground Floor, Business Complex, 28 Corporate Avenue, York, YO1 7LS, United Kingdom", "website": "", "industry": "Other", "size": "Big", "top_lead": False, "notes": "New lead, cold call", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=6)},
        {"company_name": "Kappa Industries", "contact_person_name": "Noah", "contact_person_surname": "Young", "email": "kappa.industries@example.com", "phone": "+3234567894", "address": "Kappa Industries, Unit 7, Retail Business Park, 15 Consumer Lane, Milton Keynes, MK9 2FT, United Kingdom", "website": "", "industry": "Retail", "size": "Medium", "top_lead": False, "notes": "Strong interest", "converted_to_pipeline": True, "created_by": 3, "created_at": now() - timedelta(days=6)},
        {"company_name": "Theta Logistics", "contact_person_name": "Olivia", "contact_person_surname": "King", "email": "theta.logistics@example.com", "phone": "+3234567895", "address": "Theta Logistics, Office 10, Industrial Hub, 47 Warehouse Road, Hull, HU1 3AP, United Kingdom", "website": "", "industry": "Services", "size": "Small", "top_lead": False, "notes": "Meeting scheduled", "converted_to_pipeline": True, "created_by": 3, "created_at": now() - timedelta(days=7)},
        {"company_name": "Lambda Tech", "contact_person_name": "William", "contact_person_surname": "Scott", "email": "lambda.tech@example.com", "phone": "+221213277898", "address": "Lambda Tech, Floor 3, Innovation Plaza, 12 Digital Street, Swansea, SA1 8FE, United Kingdom", "website": "https://www.lambda-tech.com", "industry": "Manufacturing", "size": "Big", "top_lead": True, "notes": "Strategic partner", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=7)},
        {"company_name": "Nu Consulting", "contact_person_name": "James", "contact_person_surname": "Nelson", "email": "nu.consulting@example.com", "phone": "+3234567897", "address": "Nu Consulting, Unit 5, Consultancy Centre, 75 Business Park Road, Portsmouth, PO1 2AH, United Kingdom", "website": "", "industry": "Other", "size": "Small", "top_lead": False, "notes": "Awaiting proposal", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=7)},
        {"company_name": "Omicron Digital", "contact_person_name": "Sophia", "contact_person_surname": "Mitchell", "email": "omicron.digital@example.com", "phone": "+3234567898", "address": "Omicron Digital, Suite 9, Tech Incubator, 99 Software Avenue, Liverpool, L2 4QE, United Kingdom", "website": "https://www.omicron-digital.com", "industry": "Retail", "size": "Medium", "top_lead": True, "notes": "High potential deal", "converted_to_pipeline": True, "created_by": 3, "created_at": now() - timedelta(days=8)},
        {"company_name": "Rho Ventures", "contact_person_name": "Benjamin", "contact_person_surname": "Perez", "email": "rho.ventures@example.com", "phone": "+221213277898", "address": "Rho Ventures, Office 18, Corporate Centre, 88 Investment Drive, London, WC1B 5RJ, United Kingdom", "website": "https://www.rho-ventures.com", "industry": "Services", "size": "Big", "top_lead": False, "notes": "Exploring collaboration", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=8)},
        
        # Leads for statistic
        {"company_name": "Omega Group", "contact_person_name": "Sarah", "contact_person_surname": "Green", "email": "omega@example.com", "phone": "+221213277836", "address": "Omega Group, Floor 6, Business Innovation Hub, 10 Enterprise Street, Edinburgh, EH2 7DL, United Kingdom", "website": "https://www.omega-group.com", "industry": "Other", "size": "Big", "top_lead": True, "notes": "Key potential partner", "converted_to_pipeline": True, "created_by": 1, "created_at": now() - timedelta(days=8)},
        {"company_name": "Theta Enterprises", "contact_person_name": "David", "contact_person_surname": "Black", "email": "theta@example.com", "phone": "+221213277817", "address": "Theta Enterprises, Unit 14, Retail Park, 45 High Street, Leeds, LS1 3RT, United Kingdom", "website": "https://www.theta-enterprises.com", "industry": "Retial", "size": "Small", "top_lead": False, "notes": "Interested in early discussions", "converted_to_pipeline": True, "created_by": 1, "created_at": now() - timedelta(days=9)},
        {"company_name": "Zeta Solutions", "contact_person_name": "Emily", "contact_person_surname": "Harris", "email": "zeta@example.com", "phone": "+221215477898", "address": "Zeta Solutions, Suite 5A, Business Development Park, 20 Growth Avenue, Glasgow, G1 5JW, United Kingdom", "website": "https://www.zeta-solutions.com", "industry": "Services", "size": "Medium", "top_lead": True, "notes": "Urgent need for services", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=9)},
        {"company_name": "Sigma Innovations", "contact_person_name": "William", "contact_person_surname": "Clark", "email": "sigma@example.com", "phone": "+221213277813", "address": "Sigma Innovations, Office 7, Innovation Campus, 63 Future Road, Cardiff, CF24 2BB, United Kingdom", "website": "https://www.sigma-innovations.com", "industry": "Other", "size": "Big", "top_lead": False, "notes": "Exploring potential collaboration", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=9)},
        {"company_name": "Kappa Technologies", "contact_person_name": "Olivia", "contact_person_surname": "Taylor", "email": "kappa@example.com", "phone": "+221356277898", "address": "Kappa Technologies, 4th Floor, Tech Tower, 28 Silicon Street, Newcastle, NE3 8RQ, United Kingdom", "website": "https://www.kappa-tech.com", "industry": "Other", "size": "Small", "top_lead": True, "notes": "Highly engaged, requires demo", "converted_to_pipeline": True, "created_by": 2, "created_at": now() - timedelta(days=10)},
        {"company_name": "Lambda Industries", "contact_person_name": "Daniel", "contact_person_surname": "Wilson", "email": "lambda@example.com", "phone": "+221129277898", "address": "Lambda Industries, Unit 22, Business Gateway, 40 Industrial Road, Nottingham, NG5 6HH, United Kingdom", "website": "https://www.lambda-industries.com", "industry": "Retial", "size": "Medium", "top_lead": True, "notes": "Needs further qualification", "converted_to_pipeline": True, "created_by": 3, "created_at": now() - timedelta(days=10)},
        {"company_name": "Phi Consulting", "contact_person_name": "Sophia", "contact_person_surname": "Adams", "email": "phi@example.com", "phone": "+227213267845", "address": "Phi Consulting, Suite 8, Executive Park, 55 Corporate Drive, Southampton, SO16 7GJ, United Kingdom", "website": "https://www.phi-consulting.com", "industry": "Manufacturing", "size": "Big", "top_lead": True, "notes": "High potential for partnership", "converted_to_pipeline": False, "created_by": 3, "created_at": now() - timedelta(days=10)}
    ]

    leads_to_create = []

    for lead_data in leads_data:
        lead_to_create = Lead(
            company_name=lead_data["company_name"],
            contact_person_name=lead_data["contact_person_name"],
            contact_person_surname=lead_data["contact_person_surname"],
            email=lead_data["email"],
            phone=lead_data["phone"],
            address=lead_data['address'],
            website=lead_data["website"],
            industry=lead_data["industry"],
            size=lead_data["size"],
            top_lead=lead_data["top_lead"],
            notes=lead_data["notes"],
            converted_to_pipeline=lead_data["converted_to_pipeline"],
            created_by_id=lead_data["created_by"],
            created_at=lead_data["created_at"],
        )
        leads_to_create.append(lead_to_create)

    try:
        Lead.objects.bulk_create(leads_to_create)
        print(f"✅ Successfully created {len(leads_to_create)} leads.")
    except IntegrityError as e:
        print(f"❌ Error occurred: {e}")

def create_pipelines():
    pipelines_data = [
        {"lead_id": 1, "deal_name": "Cloud Infrastructure Overhaul", "expected_value": 350000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 1},
        {"lead_id": 2, "deal_name": "Premium Engine Components Deal", "expected_value": 500000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 1},
        {"lead_id": 3, "deal_name": "Business-Class Laptop Deployment", "expected_value": 250000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 1},
        {"lead_id": 5, "deal_name": "Customized Workstations for Teams", "expected_value": 420000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 1},
        {"lead_id": 8, "deal_name": "Data Recovery & Backup Solutions", "expected_value": 180000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 1},
        {"lead_id": 11, "deal_name": "Suspension Upgrade Kit", "expected_value": 300000.00, "stage": "Negotiation", "status": "Active", "created_by_id": 2},
        {"lead_id": 12, "deal_name": "Anti-Glare Glasses for Professionals", "expected_value": 120000.00, "stage": "Negotiation", "status": "Active", "created_by_id": 2},
        {"lead_id": 16, "deal_name": "Next-Gen Server Deployment", "expected_value": 450000.00, "stage": "Negotiation", "status": "Active", "created_by_id": 2},
        {"lead_id": 19, "deal_name": "Work-from-Home Laptop Bundle", "expected_value": 220000.00, "stage": "Proposal Sent", "status": "Active", "created_by_id": 2},
        {"lead_id": 25, "deal_name": "Comprehensive Coverage Plan", "expected_value": 150000.00, "stage": "Won", "status": "Active", "created_by_id": 3},
        {"lead_id": 26, "deal_name": "Digital Transformation Partnership", "expected_value": 1800000.00, "stage": "Negotiation", "status": "Active", "created_by_id": 3},
        {"lead_id": 29, "deal_name": "Alloy Wheels & Tires Package", "expected_value": 80000.00, "stage": "Prospecting", "status": "Active", "created_by_id": 3},

        # New pipelines for statistic
        {"lead_id": 31, "deal_name": "Enterprise Software Licensing", "expected_value": 750000.00, "stage": "Won", "status": "Won", "created_by_id": 1},
        {"lead_id": 32, "deal_name": "Cloud Software Licensing", "expected_value": 950000.00, "stage": "Proposal Sent", "status": "Lost", "created_by_id": 1},
        {"lead_id": 33, "deal_name": "AI-Powered Analytics Platform", "expected_value": 650000.00, "stage": "Won", "status": "Won", "created_by_id": 2},
        {"lead_id": 34, "deal_name": "Next-Gen Cybersecurity Solutions", "expected_value": 500000.00, "stage": "Prospecting", "status": "Lost", "created_by_id": 2},
        {"lead_id": 35, "deal_name": "Smart Office Automation System", "expected_value": 300000.00, "stage": "Proposal Sent", "status": "Lost", "created_by_id": 2},
        {"lead_id": 36, "deal_name": "Cloud-Based Collaboration Suite", "expected_value": 400000.00, "stage": "Negotiation", "status": "Lost", "created_by_id": 3},
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
            status=pipeline_data["status"],
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
        {"user_id": 1, "title": "Follow-up with Alpha Corp", "description": "Check in with John Doe regarding the proposal.", "created_at": now() - timedelta(days=2, hours=2), "reminder_date": now() + timedelta(days=2)},
        {"user_id": 1, "title": "Send updated quote to Beta LLC", "description": "Prepare and send the revised quote to Jane Smith.", "created_at": now() - timedelta(days=3, hours=3), "reminder_date": now() + timedelta(days=3)},
        {"user_id": 1, "title": "Schedule meeting with Gamma Ltd", "description": "Arrange a meeting with Alice Johnson.", "created_at": now() - timedelta(days=4, hours=2), "reminder_date": now() + timedelta(days=5)},
        {"user_id": 1, "title": "Review Delta Inc contract", "description": "Go through the contract details before signing.", "created_at": now() - timedelta(days=1, hours=2, minutes=5), "reminder_date": now() + timedelta(days=7)},
        {"user_id": 2, "title": "Follow up with Lambda Corp", "description": "Discuss project scope with Jack Brown.", "created_at": now() - timedelta(days=3, hours=6, minutes=15), "reminder_date": now() + timedelta(days=1)},
        {"user_id": 2, "title": "Check progress with Mu LLC", "description": "See if Sophia Green has reviewed the offer.", "created_at": now() - timedelta(days=2, hours=6, minutes=18), "reminder_date": now() + timedelta(days=4)},
        {"user_id": 2, "title": "Confirm deal with Nu Ltd", "description": "Ensure Henry Johnson signs the agreement.", "created_at": now() - timedelta(days=1, hours=5, minutes=32), "reminder_date": now() + timedelta(days=6)},
        {"user_id": 3, "title": "Negotiate with Vega Corp", "description": "Finalize contract details with Daniel Carter.", "created_at": now() - timedelta(days=3, hours=1, minutes=7), "reminder_date": now() + timedelta(days=2)},
        {"user_id": 3, "title": "Prepare report for Omega Solutions", "description": "Summarize key points before meeting with Sarah Harris.", "created_at": now() - timedelta(days=1, minutes=35), "reminder_date": now() + timedelta(days=5)},
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
            created_at=reminder_data["created_at"],
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
