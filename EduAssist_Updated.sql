CREATE DATABASE EduAssistHelpdesk
USE EduAssistHelpdesk

CREATE TABLE Role (
    RoleID INT PRIMARY KEY IDENTITY(1,1), -- Auto-increment role ID
    RoleName NVARCHAR(50) NOT NULL UNIQUE -- Role name (Admin, Staff, Student)
);


select * from Feedback

Use EduAssistHelpdesk

INSERT INTO Role (RoleName)
VALUES 
('Admin'),
('Staff'),
('Student');

select * from [User]

CREATE TABLE [User] (
    UserID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment starting from 101
    Username NVARCHAR(16) NOT NULL UNIQUE, -- Username
    Email NVARCHAR(100) NOT NULL UNIQUE, -- Email
    PasswordHash NVARCHAR(255) NOT NULL, -- Password hash
    RoleID INT NOT NULL, -- Role of the user (linked to Role table 
	IsActive BIT NOT NULL DEFAULT 1,
    CONSTRAINT Username_Length CHECK (LEN(Username) BETWEEN 8 AND 16),
    CONSTRAINT User_EmailCheck CHECK (Email LIKE '%_@__%.__%'), -- Check for email format
    CONSTRAINT FK_User_Role FOREIGN KEY (RoleID) REFERENCES Role(RoleID) 
);

CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY IDENTITY(101,1),
    DepartmentName NVARCHAR(100) NOT NULL UNIQUE
);
select * from Professor
INSERT INTO Department (DepartmentName) VALUES
('Academics'),
('Finance'),
('Training & Placement'),
('Logistics'),
('Other')

INSERT INTO Department (DepartmentName) VALUES
('Administrator')

select * from Department

CREATE TABLE StudentProfile (
    StudentProfileID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment starting from 101
    UserID INT NOT NULL UNIQUE, -- Link to the User table
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Gender NVARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other')),
    Dob DATE CHECK (Dob < CAST(GETDATE() AS DATE)), -- Prevent future dates
    Contact NVARCHAR(10) NOT NULL CHECK (Contact LIKE '[0-9]{10}'), -- Validate 10-digit contact
    StudentAddress NVARCHAR(MAX),
    CourseID INT NOT NULL, -- Link to Course
    AcademicYear INT NOT NULL DEFAULT 1 CHECK (AcademicYear BETWEEN 1 AND 5),
    CONSTRAINT FK_StudentProfile_User FOREIGN KEY (UserID) REFERENCES [User](UserID) 
    ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade on delete/update
    CONSTRAINT FK_StudentProfile_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID),
	CONSTRAINT Contact_Check CHECK(Contact like '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')
);
alter table StudentProfile
add ProfilePic varbinary(max)

CREATE TABLE StaffProfile (
    StaffProfileID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment
    UserID INT NOT NULL UNIQUE, -- Link to User table
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Gender NVARCHAR(10) CHECK (Gender IN ('Male', 'Female', 'Other')),
    Contact NVARCHAR(10) NOT NULL CHECK (Contact LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'), -- Validate 10-digit contact
    DepartmentID INT NOT NULL, -- Link to Department
    CONSTRAINT FK_StaffProfile_User FOREIGN KEY (UserID) REFERENCES [User](UserID) 
    ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade on delete/update
    CONSTRAINT FK_StaffProfile_Department FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID) 
);



CREATE TABLE Professor (
    ProfessorID INT PRIMARY KEY IDENTITY(101,1),
	FirstName NVARCHAR(50) NOT NULL,
	LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Contact NVARCHAR(10) NOT NULL,
    Expertise NVARCHAR(255),
    CONSTRAINT Professor_EmailCheck CHECK (Email LIKE '%_@__%.__%'), 
    CONSTRAINT Professor_ContactCheck CHECK (Contact LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]') 
);

INSERT INTO Professor (FirstName, LastName, Email, Contact, Expertise)
VALUES
('Amit', 'Sharma', 'amit.sharma@example.com', '9876543210', 'Machine Learning and AI'),
('Priya', 'Verma', 'priya.verma@example.com', '9876543211', 'Data Science and Analytics'),
('Ravi', 'Kumar', 'ravi.kumar@example.com', '9876543212', 'Cloud Computing'),
('Neha', 'Singh', 'neha.singh@example.com', '9876543213', 'Software Engineering'),
('Manish', 'Yadav', 'manish.yadav@example.com', '9876543214', 'Database Management');

select * from Professor

CREATE TABLE Course (
    CourseID INT PRIMARY KEY IDENTITY(101,1),
    CourseName NVARCHAR(100) NOT NULL,
    Branch NVARCHAR(50) NOT NULL,
    HOD INT NOT NULL, 
    Fee FLOAT CHECK (Fee >= 0),
    CONSTRAINT UQ_Course UNIQUE (CourseName, Branch),
    CONSTRAINT FK_Course_HOD FOREIGN KEY (HOD) REFERENCES Professor(ProfessorID)  
);

INSERT INTO Course (CourseName, Branch, HOD, Fee)
VALUES
('B.Tech', 'Computer Science', 101, 50000),  
('B.Tech', 'Information Technology', 102, 48000),  
('M.Tech', 'Software Engineering', 103, 60000),  
('B.Tech', 'Electrical Engineering', 104, 45000),  
('M.Tech', 'Data Science', 105, 65000);  


select * from Subject

select * from Course

CREATE TABLE Subject (
    SubjectID INT PRIMARY KEY IDENTITY(101,1),
    SubjectName NVARCHAR(100) NOT NULL UNIQUE
);

insert into Subject values ('CAIT'),('DBMS'),('OOAD'),('Computer Network'),('DSA'),('DAA'),('BME')


select * from Course
select * from Subject order by SubjectID
CREATE TABLE CourseSubject (
    ID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment
    CourseID INT NOT NULL,
    SubjectName NVARCHAR(100) NOT NULL,
    CONSTRAINT UQ_CourseSubject UNIQUE (CourseID, SubjectName),
    CONSTRAINT FK_CourseSubject_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID) 
    ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade on delete/update
    CONSTRAINT FK_CourseSubject_Subject FOREIGN KEY (SubjectName) REFERENCES Subject(SubjectName) 
    ON DELETE CASCADE ON UPDATE CASCADE -- Cascade on delete/update
);

CREATE TABLE ClassSchedule (
    ScheduleID INT PRIMARY KEY IDENTITY(101,1),
    SubjectID INT NOT NULL,
    CourseID INT NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    DayOfWeek Nvarchar(9) CHECK (DayOfWeek in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')) NOT NULL,
    CONSTRAINT NoOverlap CHECK (StartTime < EndTime),
	CONSTRAINT UniqueCourseSchedule UNIQUE (CourseID, DayOfWeek, StartTime, EndTime),
	CONSTRAINT FK_ClassSchedule_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
	ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_ClassSchedule_Subject FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID)
	ON DELETE CASCADE ON UPDATE CASCADE
);




select * from ClassSchedule

CREATE TABLE ExamSchedule (
    ExamID INT PRIMARY KEY IDENTITY(101,1), -- Auto-incremented primary key
    CourseID INT NOT NULL, -- The course for which the exam is scheduled
    SubjectID INT NOT NULL, -- The subject for which the exam is scheduled
    ExamDate DATE NOT NULL, -- Date of the exam
    StartTime TIME NOT NULL, -- Start time of the exam
    EndTime TIME NOT NULL, -- End time of the exam
    Room NVARCHAR(50) NOT NULL, -- Room where the exam will be conducted
    CONSTRAINT ExamDuration CHECK (StartTime < EndTime), -- Ensure exam starts before it ends
    CONSTRAINT FutureExamDate CHECK (ExamDate >= CAST(GETDATE() AS DATE)), -- Ensure exam date is not in the past
    CONSTRAINT UniqueExamSchedule UNIQUE (CourseID, SubjectID, ExamDate, StartTime), -- Ensure no overlapping schedules for the same course and subject
    CONSTRAINT FK_ExamSchedule_Course FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
	ON DELETE CASCADE ON UPDATE CASCADE, 
    CONSTRAINT FK_ExamSchedule_Subject FOREIGN KEY (SubjectID) REFERENCES Subject(SubjectID)
	ON DELETE CASCADE ON UPDATE CASCADE
);
-- Sample Exam Schedule 1
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 101, '2024-12-20', '09:00:00', '12:00:00', 'Room 101');  -- CourseID 1, SubjectID 101

-- Sample Exam Schedule 2
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 102, '2024-12-21', '10:00:00', '13:00:00', 'Room 102');  -- CourseID 2, SubjectID 102

-- Sample Exam Schedule 3
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 103, '2024-12-22', '11:00:00', '14:00:00', 'Room 203');  -- CourseID 1, SubjectID 103

-- Sample Exam Schedule 4
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 104, '2024-12-23', '08:30:00', '11:30:00', 'Room 304');  -- CourseID 3, SubjectID 104

-- Sample Exam Schedule 5
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 105, '2024-12-24', '14:00:00', '17:00:00', 'Room 405');  -- CourseID 2, SubjectID 105

-- Sample Exam Schedule 6
INSERT INTO ExamSchedule (CourseID, SubjectID, ExamDate, StartTime, EndTime, Room)
VALUES
(103, 106, '2024-12-25', '12:00:00', '15:00:00', 'Room 506');  -- CourseID 4, SubjectID 106

select * from Subject
select * from Activities

CREATE TABLE Activities (
    ActivityID INT PRIMARY KEY IDENTITY(101,1), -- Auto-incremented primary key
    ActivityType NVARCHAR(50) NOT NULL, -- Type of activity
    Title NVARCHAR(255) NOT NULL, -- Title of the activity
    Description NVARCHAR(MAX), -- Detailed description
    Organizer NVARCHAR(255) NOT NULL, -- Name of the organizer or organization
    ActivityDate DATE NOT NULL, -- Date of the activity
    StartTime TIME NOT NULL, -- Start time of the activity
    EndTime TIME NOT NULL, -- End time of the activity
    Location NVARCHAR(255) NOT NULL, -- Location of the activity
	CONSTRAINT FutureActivityDate CHECK (ActivityDate >= CAST(GETDATE() AS DATE)), -- Ensure exam date is not in the past
    CONSTRAINT ActivityDuration CHECK (StartTime < EndTime), -- Ensure activity starts before it ends
    CONSTRAINT UniqueActivitySchedule UNIQUE (ActivityType, ActivityDate, StartTime, Location) -- Ensure no overlapping activities of the same type at the same location
);
use EduAssistHelpdesk
select * from Activities


select * from ClassSchedule
select * from PlacementDrives

CREATE TABLE PlacementDrives (
    DriveID INT PRIMARY KEY IDENTITY(101,1), -- Auto-incremented primary key
    CompanyName NVARCHAR(255) NOT NULL, -- Name of the recruiting company
    JobTitle NVARCHAR(255) NOT NULL, -- Title of the job role being offered
    EligibilityCriteria NVARCHAR(MAX), -- Details about eligibility (e.g., minimum GPA, branch requirements)
    DriveDate DATE NOT NULL, -- Date of the placement drive
    StartTime TIME NOT NULL, -- Start time of the drive
    EndTime TIME NOT NULL, -- End time of the drive
    Location NVARCHAR(255) NOT NULL, -- Venue of the placement drive
    OrganizedBy NVARCHAR(255) NOT NULL, -- Department or person organizing the drive
    Status NVARCHAR(50) NOT NULL DEFAULT 'Scheduled', -- Status of the drive (e.g., Scheduled, Ongoing, Completed)
	CONSTRAINT FutureDriveDate CHECK (DriveDate >= CAST(GETDATE() AS DATE)), -- Ensure drive date is not in the past
    CONSTRAINT CHK_PlacementDriveTime CHECK (StartTime < EndTime), -- Ensure the drive starts before it ends
    CONSTRAINT CHK_PlacementDriveStatus CHECK (Status IN ('Scheduled', 'Ongoing', 'Completed')), -- Restrict valid statuses
    CONSTRAINT UniqueDrive UNIQUE (CompanyName, JobTitle, DriveDate, StartTime, Location) -- Ensure no duplicate drives
);

--CREATE TABLE FeePaymentRecords (
--    PaymentID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment starting from 10000
--    StudentID INT NOT NULL, -- Reference to the Student
--    TotalFee FLOAT NOT NULL, -- Derived from Course table
--    PaidFee FLOAT NOT NULL DEFAULT 0.00, -- Total amount paid by the student
--    PendingFee AS (TotalFee - PaidFee) PERSISTED, -- Automatically calculated as the difference between TotalFee and PaidFee
--    LastPaymentDate DATETIME, -- Date of the last payment
--    Created DATETIME NOT NULL DEFAULT GETDATE(), -- Default to the current datetime
--    CONSTRAINT CHK_PaidFee CHECK (PaidFee >= 0), -- Paid fee must be non-negative
--    CONSTRAINT CHK_PendingFee CHECK (PendingFee >= 0), -- Pending fee must be non-negative
--    CONSTRAINT FK_FeePaymentRecords_Student FOREIGN KEY (StudentID) REFERENCES StudentProfile(StudentProfileID)
--	ON DELETE CASCADE ON UPDATE CASCADE
--);

--CREATE TRIGGER trg_SetTotalFee
--ON FeePaymentRecords
--AFTER INSERT
--AS
--BEGIN
--    -- Updating the TotalFee in FeePaymentRecords based on the Course TotalFee
--    UPDATE FeePaymentRecords
--    SET TotalFee = C.Fee
--    FROM FeePaymentRecords FPR
--    INNER JOIN Inserted I ON FPR.PaymentID = I.PaymentID
--    INNER JOIN StudentProfile SP ON I.StudentID = SP.StudentProfileID
--    INNER JOIN Course C ON SP.CourseID = C.CourseID;
--END;

drop table FeePaymentRecords

CREATE TABLE FeePaymentRecords (
    PaymentID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment starting from 10000
    StudentID INT NOT NULL, -- Reference to the Student
    TotalFee FLOAT, -- Derived from Course table
    PaidFee FLOAT NOT NULL DEFAULT 0.00, -- Total amount paid by the student
    PendingFee FLOAT, -- Automatically calculated as the difference between TotalFee and PaidFee
    PaymentYear INT NOT NULL, -- Year of the payment
    Created DATETIME NOT NULL DEFAULT GETDATE(), -- Default to the current datetime
    CONSTRAINT CHK_PaidFee CHECK (PaidFee >= 0), -- Paid fee must be non-negative
    CONSTRAINT CHK_PendingFee CHECK (PendingFee >= 0), -- Pending fee must be non-negative
    CONSTRAINT FK_FeePaymentRecords_Student FOREIGN KEY (StudentID) REFERENCES StudentProfile(StudentProfileID)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TRIGGER trg_SetTotalFee
ON FeePaymentRecords
AFTER INSERT
AS
BEGIN
    -- Declare necessary variables
    DECLARE @StudentID INT, @PaymentYear INT, @TotalFee FLOAT, @TotalPaidFee FLOAT, @RemainingFee FLOAT, @NewPaidFee FLOAT;

    -- Fetch the StudentID and PaymentYear from the inserted record
    SELECT @StudentID = StudentID, @PaymentYear = PaymentYear
    FROM Inserted;

    -- Step 2: Fetch the TotalFee using the CourseID of the student from the StudentProfile table
    SELECT @TotalFee = C.Fee
    FROM StudentProfile SP
    INNER JOIN Course C ON SP.CourseID = C.CourseID
    WHERE SP.StudentProfileID = @StudentID;

    -- Step 3: Calculate the total PaidFee for the student for the given PaymentYear
    SELECT @TotalPaidFee = ISNULL(SUM(PaidFee), 0)
    FROM FeePaymentRecords
    WHERE StudentID = @StudentID AND PaymentYear = @PaymentYear;

	PRINT 'The total paid fee is: ' + CAST(@TotalPaidFee AS VARCHAR(10));

    -- Step 4: Calculate the Remaining Fee based on the TotalPaidFee and the new PaidFee from the inserted record
    SELECT @NewPaidFee = PaidFee FROM Inserted;

    -- Calculate Remaining Fee for the PaymentYear
    SET @RemainingFee = @TotalFee - @TotalPaidFee;
	PRINT 'The remaining fee is: ' + CAST(@RemainingFee AS VARCHAR(10));

	PRINT 'The total paid fee + new paid fee is: ' + CAST((@TotalPaidFee+@NewPaidFee) AS VARCHAR(10));
    -- Step 5: If the total PaidFee + new PaidFee is greater than or equal to the TotalFee, or if total PaidFee equals TotalFee, rollback
    IF (@TotalPaidFee > @TotalFee) OR (@TotalPaidFee - @NewPaidFee = @TotalFee)
    BEGIN
        -- If the new payment will make the total paid exceed or equal the course fee, or if the student has already paid the full fee
        RAISERROR('Payment exceeds or matches the total fee for the year. Record insertion aborted.', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Step 6: Update the inserted record with the RemainingFee (PendingFee)
    UPDATE FPR
    SET 
        -- Set the TotalFee based on the student's course fee
        FPR.TotalFee = @TotalFee,
        -- Set the PendingFee (Remaining Fee) based on the new payment
        FPR.PendingFee = @RemainingFee
    FROM FeePaymentRecords FPR
    INNER JOIN Inserted I ON FPR.PaymentID = I.PaymentID;

END;



select * from Course
select * from StudentProfile

INSERT INTO FeePaymentRecords (StudentID, PaidFee, PaymentYear)
VALUES 
(111, 10000.00, 2025)  -- StudentID 1, paid 20000 in 2024
Select * from FeePaymentRecords

CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment starting from 1000
    StudentID INT NOT NULL, -- Reference to the Student providing the feedback
    FeedbackText NVARCHAR(MAX) NOT NULL, -- Detailed feedback from the student
    Rating INT DEFAULT 1 CHECK (Rating >= 1 AND Rating <= 5), -- Rating between 1 (poor) and 5 (excellent)
    FeedbackDate DATETIME NOT NULL DEFAULT GETDATE(), -- Date when the feedback is provided
    Created DATETIME NOT NULL DEFAULT GETDATE(), -- Timestamp for record creation
    CONSTRAINT FK_Feedback_Student FOREIGN KEY (StudentID) REFERENCES StudentProfile(StudentProfileID)
	ON DELETE CASCADE ON UPDATE CASCADE-- Foreign key for Student
);

INSERT INTO Feedback (StudentID, FeedbackText, Rating)
VALUES 
(111, N'Great course, really enjoyed the lessons and the instructor was helpful. Would highly recommend to others!', 5),
(111, N'Good material, but some of the concepts were difficult to understand. It would be helpful if more examples were provided.', 3),
(111, N'The course was okay, but the assignments felt too easy and did not challenge me enough. Could use more difficult tasks.', 2),
(111, N'Excellent course! The content was engaging, and I learned a lot. Keep up the great work.', 5);


CREATE TABLE Logistics (
    LogisticsID INT PRIMARY KEY IDENTITY(101,1), -- Auto-incremented primary key
    Category NVARCHAR(100) NOT NULL, -- Category of the logistical issue (e.g., Transport, Equipment, Infrastructure)
);


CREATE TABLE Tickets (
    TicketID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment
    StudentID INT NOT NULL, -- Link to StudentProfile
    DepartmentID INT NOT NULL, -- Link to Department
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    CurrentStatus NVARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (CurrentStatus IN ('Open', 'In-Progress', 'Resolved', 'Closed')),
    AssignedToStaffID INT NULL, -- Nullable link to StaffProfile
    ResolvedDate DATETIME NULL,
    Created DATETIME NOT NULL DEFAULT GETDATE(),
    Updated DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Tickets_Student FOREIGN KEY (StudentID) REFERENCES StudentProfile(StudentProfileID) 
    ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade on delete/update
    CONSTRAINT FK_Tickets_Department FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID), 
    CONSTRAINT FK_Tickets_Staff FOREIGN KEY (AssignedToStaffID) REFERENCES StaffProfile(StaffProfileID)
);

select * from Department

select * from Tickets
select * from TicketLog

CREATE TRIGGER trg_InsertTicketLog
ON Tickets
AFTER INSERT
AS
BEGIN
    -- Insert a new log entry into the TicketLog table
    INSERT INTO TicketLog (
        TicketID,
        UpdatedByStaffID,
        Status,
        Comments,
        AssignedStaffID,
        UpdatedDate
    )
    SELECT 
        inserted.TicketID, -- Reference to the newly created ticket
        NULL, -- No staff initially updating, as it's a new ticket
        inserted.CurrentStatus, -- Initial status of the ticket
        'Ticket created', -- Comment indicating ticket creation
        inserted.AssignedToStaffID, -- Assigned staff (if any)
        GETDATE() -- Current timestamp
    FROM inserted; -- Use the inserted table to reference new rows
END;


CREATE TABLE TicketLog (
    LogID INT PRIMARY KEY IDENTITY(101,1), -- Auto-increment
    TicketID INT NOT NULL, -- Link to Tickets
    UpdatedByStaffID INT NULL, -- Nullable link to StaffProfile
    PreviousStatus NVARCHAR(50),
    Status NVARCHAR(50) NOT NULL DEFAULT 'Open' CHECK (Status IN ('Open', 'In-Progress', 'Resolved', 'Closed')),
    Comments NVARCHAR(MAX),
    AssignedStaffID INT NULL, -- Nullable link to StaffProfile
    UpdatedDate DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_TicketLog_Ticket FOREIGN KEY (TicketID) REFERENCES Tickets(TicketID) 
    ON DELETE CASCADE ON UPDATE CASCADE, -- Cascade on delete/update
    CONSTRAINT FK_TicketLog_Staff FOREIGN KEY (UpdatedByStaffID) REFERENCES StaffProfile(StaffProfileID), 
    CONSTRAINT FK_TicketLog_AssignedStaff FOREIGN KEY (AssignedStaffID) REFERENCES StaffProfile(StaffProfileID) 
);
select * from [User]
CREATE TRIGGER trg_UpdateTickets
ON TicketLog
AFTER INSERT
AS
BEGIN
    -- Update the Tickets table based on the log entry
    UPDATE Tickets
    SET 
        CurrentStatus = inserted.Status, -- Update the current status
        Updated = GETDATE(), -- Update the Updated column to the current timestamp
        AssignedToStaffID = inserted.AssignedStaffID, -- Update the assigned staff member
        ResolvedDate = CASE 
            WHEN inserted.Status = 'Resolved' THEN GETDATE() -- If resolved, set the resolved date
            ELSE NULL -- Otherwise, keep it null
        END
    FROM Tickets
    INNER JOIN inserted ON Tickets.TicketID = inserted.TicketID; -- Match TicketID
END;


select * from Tickets