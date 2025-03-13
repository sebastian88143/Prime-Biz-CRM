-- Creating CRM users
INSERT INTO User (username, email, password, is_active, is_staff, is_superuser, created_at) VALUES 
('BusinessStrategist', 'strategist@example.com', SHA2('bs123!', 256), 1, 1, 0, NOW()), 
('ClientRelationsPro', 'relations@example.com', SHA2('crpp123!', 256), 1, 1, 0, NOW()), 
('RevenueLeader', 'revenue@example.com', SHA2('rl123!', 256), 1, 1, 0, NOW());

-- Getting users ID
SET @bs_id = (SELECT id FROM User WHERE username = 'BusinessStrategist');
SET @crp_id = (SELECT id FROM User WHERE username = 'ClientRelationsPro');
SET @rl_id = (SELECT id FROM User WHERE username = 'RevenueLeader');

-- Adding leads for BusinessStrategist user
INSERT INTO `Lead` (company_name, contact_person_name, contact_person_surname, email, phone, address, website, industry, size, top_lead, notes, created_by_id, created_at) VALUES 
('Alpha Corp', 'John', 'Doe', 'alpha@example.com', '+1234567890', '123 Alpha St', 'www.alpha.com', 'Manufacturing', 'Small', 0, 'Potential client', @bs_id, NOW()),
('Beta LLC', 'Jane', 'Smith', 'beta@example.com', '+1234567891', '456 Beta Rd', 'www.beta.com', 'Retail', 'Medium', 1, 'VIP client', @bs_id, NOW()),
('Gamma Ltd', 'Alice', 'Johnson', 'gamma@example.com', '+1234567892', '789 Gamma Ave', 'www.gamma.com', 'Services', 'Big', 0, 'Needs follow-up', @bs_id, NOW()),
('Delta Inc', 'Robert', 'Brown', 'delta@example.com', '+1234567893', '321 Delta Blvd', 'www.delta.com', 'Other', 'Small', 1, 'Interested', @bs_id, NOW()),
('Epsilon Co', 'Michael', 'White', 'epsilon@example.com', '+1234567894', '654 Epsilon Ct', 'www.epsilon.com', 'Manufacturing', 'Medium', 0, 'Might convert', @bs_id, NOW()),
('Zeta Group', 'Laura', 'Green', 'zeta@example.com', '+1234567895', '987 Zeta Way', 'www.zeta.com', 'Retail', 'Big', 1, 'Priority', @bs_id, NOW()),
('Eta Solutions', 'David', 'Black', 'eta@example.com', '+1234567896', '111 Eta Ln', 'www.eta.com', 'Services', 'Small', 0, 'Pending response', @bs_id, NOW()),
('Theta Systems', 'Emma', 'Blue', 'theta@example.com', '+1234567897', '222 Theta Cir', 'www.theta.com', 'Other', 'Medium', 1, 'In discussion', @bs_id, NOW()),
('Iota Innovations', 'William', 'Gray', 'iota@example.com', '+1234567898', '333 Iota Pkwy', 'www.iota.com', 'Manufacturing', 'Big', 0, 'Negotiating', @bs_id, NOW()),
('Kappa Enterprises', 'Olivia', 'Red', 'kappa@example.com', '+1234567899', '444 Kappa St', 'www.kappa.com', 'Retail', 'Small', 1, 'High potential', @bs_id, NOW());

-- Adding leads for ClientRelationsPro user
INSERT INTO `Lead` (company_name, contact_person_name, contact_person_surname, email, phone, address, website, industry, size, top_lead, notes, created_by_id, created_at) VALUES 
('Lambda Corp', 'Jack', 'Brown', 'lambda@example.com', '+2234567890', '123 Lambda St', 'www.lambda.com', 'Services', 'Big', 1, 'Good prospect', @crp_id, NOW()),
('Mu LLC', 'Sophia', 'Green', 'mu@example.com', '+2234567891', '456 Mu Rd', 'www.mu.com', 'Other', 'Small', 0, 'Follow-up needed', @crp_id, NOW()),
('Nu Ltd', 'Henry', 'Johnson', 'nu@example.com', '+2234567892', '789 Nu Ave', 'www.nu.com', 'Manufacturing', 'Medium', 1, 'Potential deal', @crp_id, NOW()),
('Xi Inc', 'Ethan', 'White', 'xi@example.com', '+2234567893', '321 Xi Blvd', 'www.xi.com', 'Retail', 'Big', 0, 'Needs consultation', @crp_id, NOW()),
('Omicron Co', 'Charlotte', 'Blue', 'omicron@example.com', '+2234567894', '654 Omicron Ct', 'www.omicron.com', 'Services', 'Small', 1, 'In process', @crp_id, NOW()),
('Pi Group', 'James', 'Black', 'pi@example.com', '+2234567895', '987 Pi Way', 'www.pi.com', 'Other', 'Medium', 0, 'Considering options', @crp_id, NOW()),
('Rho Solutions', 'Isabella', 'Gray', 'rho@example.com', '+2234567896', '111 Rho Ln', 'www.rho.com', 'Manufacturing', 'Big', 0, 'High interest', @crp_id, NOW()),
('Sigma Systems', 'Mia', 'Red', 'sigma@example.com', '+2234567897', '222 Sigma Cir', 'www.sigma.com', 'Retail', 'Small', 0, 'Early contact', @crp_id, NOW()),
('Tau Innovations', 'Alexander', 'Pink', 'tau@example.com', '+2234567898', '333 Tau Pkwy', 'www.tau.com', 'Services', 'Medium', 1, 'Ready for proposal', @crp_id, NOW()),
('Upsilon Enterprises', 'Ava', 'Orange', 'upsilon@example.com', '+2234567899', '444 Upsilon St', 'www.upsilon.com', 'Other', 'Big', 0, 'Pending review', @crp_id, NOW());

-- Adding leads for RevenueLeader user
INSERT INTO `Lead` (company_name, contact_person_name, contact_person_surname, email, phone, address, website, industry, size, top_lead, notes, created_by_id, created_at) VALUES 
('Vega Corp', 'Daniel', 'Carter', 'vega@example.com', '+3234567890', '123 Vega St', 'www.vega.com', 'Retail', 'Big', 1, 'Negotiating contract', @rl_id, NOW()),
('Omega Solutions', 'Sarah', 'Harris', 'omega@example.com', '+3234567891', '456 Omega Rd', 'www.omega.com', 'Services', 'Small', 0, 'Potential upsell', @rl_id, NOW()),
('Delta Enterprises', 'Liam', 'Walker', 'delta.ent@example.com', '+3234567892', '789 Delta Ave', 'www.deltaent.com', 'Manufacturing', 'Medium', 0, 'VIP client', @rl_id, NOW()),
('Sigma Co', 'Emma', 'Lopez', 'sigma.co@example.com', '+3234567893', '321 Sigma Blvd', 'www.sigmaco.com', 'Other', 'Big', 0, 'New lead, cold call', @rl_id, NOW()),
('Kappa Industries', 'Noah', 'Young', 'kappa.industries@example.com', '+3234567894', '654 Kappa Ct', 'www.kappaind.com', 'Retail', 'Medium', 0, 'Strong interest', @rl_id, NOW()),
('Theta Logistics', 'Olivia', 'King', 'theta.logistics@example.com', '+3234567895', '987 Theta Way', 'www.theta.com', 'Services', 'Small', 0, 'Meeting scheduled', @rl_id, NOW()),
('Lambda Tech', 'William', 'Scott', 'lambda.tech@example.com', '+3234567896', '111 Lambda Ln', 'www.lambdatech.com', 'Manufacturing', 'Big', 1, 'Strategic partner', @rl_id, NOW()),
('Nu Consulting', 'James', 'Nelson', 'nu.consulting@example.com', '+3234567897', '222 Nu Cir', 'www.nuconsulting.com', 'Other', 'Small', 0, 'Awaiting proposal', @rl_id, NOW()),
('Omicron Digital', 'Sophia', 'Mitchell', 'omicron.digital@example.com', '+3234567898', '333 Omicron Pkwy', 'www.omicron.digital', 'Retail', 'Medium', 1, 'High potential deal', @rl_id, NOW()),
('Rho Ventures', 'Benjamin', 'Perez', 'rho.ventures@example.com', '+3234567899', '444 Rho St', 'www.rhoventures.com', 'Services', 'Big', 0, 'Exploring collaboration', @rl_id, NOW());

-- Adding pipeline for BusinessStrategist user
INSERT INTO `Pipeline` (lead_id, deal_name, expected_value, stage, created_by_id, created_at) VALUES
(1, 'Cloud Infrastructure Overhaul', 350000.00, 'Prospecting', @bs_id, NOW()),
(2, 'Premium Engine Components Deal', 500000.00, 'Prospecting', @bs_id, NOW()),
(3, 'Business-Class Laptop Deployment', 250000.00, 'Prospecting', @bs_id, NOW()),
(4, 'Customized Workstations for Teams', 420000.00, 'Prospecting', @bs_id, NOW()),
(5, 'Data Recovery & Backup Solutions', 180000.00, 'Prospecting', @bs_id, NOW()),
(6, 'Suspension Upgrade Kit', 300000.00, 'Negotiation', @bs_id, NOW()),
(7, 'Anti-Glare Glasses for Professionals', 120000.00, 'Negotiation', @bs_id, NOW()),
(8, 'Next-Gen Server Deployment', 450000.00, 'Negotiation', @bs_id, NOW()),
(9, 'Work-from-Home Laptop Bundle', 220000.00, 'Proposal Sent', @bs_id, NOW()),
(10, 'Comprehensive Coverage Plan', 150000.00, 'Won', @bs_id, NOW());

-- Adding pipeline for ClientRelationsPro user
INSERT INTO `Pipeline` (lead_id, deal_name, expected_value, stage, created_by_id, created_at) VALUES
(11, 'Digital Transformation Partnership', 1800000.00, 'Negotiation', @crp_id, NOW()),
(12, 'Alloy Wheels & Tires Package', 80000.00, 'Prospecting', @crp_id, NOW()),
(13, 'Enterprise Networking Equipment', 380000.00, 'Proposal Sent', @crp_id, NOW()),
(14, 'Strategic Seat Belt Retrofit Kit', 220000.00, 'Prospecting', @crp_id, NOW()),
(15, 'Impact-Resistant Glasses Offer', 120000.00, 'Proposal Sent', @crp_id, NOW()),
(16, 'Customized Auto Insurance Deal', 250000.00, 'Prospecting', @crp_id, NOW()),
(17, 'Premium Vehicle Protection', 400000.00, 'Prospecting', @crp_id, NOW()),
(18, 'High-Performance Car Seat Belts', 170000.00, 'Negotiation', @crp_id, NOW()),
(19, 'Negotiating contract for Car Insurance', 290000.00, 'Negotiation', @crp_id, NOW()),
(20, 'Workplace Safety Seat Belts Package', 130000.00, 'Prospecting', @crp_id, NOW());

-- Adding pipeline for RevenueLeader user
INSERT INTO `Pipeline` (lead_id, deal_name, expected_value, stage, created_by_id, created_at) VALUES
(21, 'Premium Seat Belt Solutions', 380000.00, 'Prospecting', @rl_id, NOW()),
(22, 'Strategic Partner for Data Security', 220000.00, 'Negotiation', @rl_id, NOW()),
(23, 'High-Performance Workstation Deal', 2700000.00, 'Prospecting', @rl_id, NOW()),
(24, 'Negotiating contract for Laptops', 350000.00, 'Negotiation', @rl_id, NOW()),
(25, 'Custom IT Equipment Package', 450000.00, 'Prospecting', @rl_id, NOW()),
(26, 'Cloud Infrastructure Setup for Logistics', 280000.00, 'Prospecting', @rl_id, NOW()),
(27, 'Next-Gen Server Deal', 500000.00, 'Negotiation', @rl_id, NOW()),
(28, 'Comprehensive Consulting Package', 180000.00, 'Proposal Sent', @rl_id, NOW()),
(29, 'Digital Transformation Solutions', 250000.00, 'Won', @rl_id, NOW()),
(30, 'Premium IT Support Contract', 2500000.00, 'Proposal Sent', @rl_id, NOW());

-- Adding reminders for BusinessStrategist user
INSERT INTO `Reminder` (user_id, title, description, reminder_date, created_at) VALUES
(@bs_id, 'Follow-up with Alpha Corp', 'Check in with John Doe regarding the proposal.', NOW() + INTERVAL 2 DAY, NOW()),
(@bs_id, 'Send updated quote to Beta LLC', 'Prepare and send the revised quote to Jane Smith.', NOW() + INTERVAL 3 DAY, NOW()),
(@bs_id, 'Schedule meeting with Gamma Ltd', 'Arrange a meeting with Alice Johnson.', NOW() + INTERVAL 5 DAY, NOW()),
(@bs_id, 'Review Delta Inc contract', 'Go through the contract details before signing.', NOW() + INTERVAL 7 DAY, NOW());

-- Adding reminders for ClientRelationsPro user
INSERT INTO `Reminder` (user_id, title, description, reminder_date, created_at) VALUES
(@crp_id, 'Follow up with Lambda Corp', 'Discuss project scope with Jack Brown.', NOW() + INTERVAL 1 DAY, NOW()),
(@crp_id, 'Check progress with Mu LLC', 'See if Sophia Green has reviewed the offer.', NOW() + INTERVAL 4 DAY, NOW()),
(@crp_id, 'Confirm deal with Nu Ltd', 'Ensure Henry Johnson signs the agreement.', NOW() + INTERVAL 6 DAY, NOW());

-- Adding reminders for RevenueLeader user
INSERT INTO `Reminder` (user_id, title, description, reminder_date, created_at) VALUES
(@rl_id, 'Negotiate with Vega Corp', 'Finalize contract details with Daniel Carter.', NOW() + INTERVAL 2 DAY, NOW()),
(@rl_id, 'Prepare report for Omega Solutions', 'Summarize key points before meeting with Sarah Harris.', NOW() + INTERVAL 5 DAY, NOW());