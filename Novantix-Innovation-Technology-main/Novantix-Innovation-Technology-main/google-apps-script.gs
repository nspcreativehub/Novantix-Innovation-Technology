// ============================================
// NOVANTIX INNOVATION TECHNOLOGY
// Enrollment Form Handler - Google Apps Script
// ============================================

// CONFIGURATION
const ADMIN_EMAIL = "hellonsp1919@gmail.com";
const SHEET_NAME = "Enrollments";

// Main function to handle POST requests
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name || !data.email || !data.mobile || !data.course) {
      return createResponse(false, "All fields are required");
    }
    
    // Add to Google Sheet
    const sheetResult = addToSheet(data);
    
    // Send email notification
    const emailResult = sendEmailNotification(data);
    
    // Return success response
    return createResponse(true, "Enrollment submitted successfully!");
    
  } catch (error) {
    Logger.log("Error: " + error.message);
    return createResponse(false, "Server error: " + error.message);
  }
}

// Add enrollment data to Google Sheet
function addToSheet(data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow(["Timestamp", "Name", "Email", "Mobile", "Course", "Status"]);
      // Format header row
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#667eea").setFontColor("#ffffff");
    }
    
    // Add new enrollment
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.name,
      data.email,
      data.mobile,
      data.course,
      "New"
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 6);
    
    return true;
  } catch (error) {
    Logger.log("Sheet Error: " + error.message);
    throw error;
  }
}

// Send email notification to admin
function sendEmailNotification(data) {
  try {
    const subject = "🎓 New Student Enrollment - Novantix Innovation Technology";
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; }
          .value { color: #333; margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">New Student Enrollment</h2>
            <p style="margin: 5px 0 0 0;">Novantix Innovation Technology</p>
          </div>
          <div class="content">
            <p>You have received a new enrollment request:</p>
            
            <div class="field">
              <div class="label">👤 Student Name</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">📧 Email Address</div>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <div class="label">📱 Mobile Number</div>
              <div class="value">${data.mobile}</div>
            </div>
            
            <div class="field">
              <div class="label">📚 Course Selected</div>
              <div class="value">${data.course}</div>
            </div>
            
            <div class="field">
              <div class="label">⏰ Enrollment Time</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
            
            <p style="margin-top: 20px;">
              <strong>Next Steps:</strong><br>
              Please follow up with the student within 24 hours.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated email from Novantix Innovation Technology Enrollment System</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const plainBody = `
New Student Enrollment - Novantix Innovation Technology

Student Name: ${data.name}
Email: ${data.email}
Mobile: ${data.mobile}
Course: ${data.course}
Time: ${new Date().toLocaleString()}

Please follow up with the student.
    `;
    
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      body: plainBody
    });
    
    return true;
  } catch (error) {
    Logger.log("Email Error: " + error.message);
    throw error;
  }
}

// Create JSON response
function createResponse(success, message) {
  const response = {
    success: success,
    message: message
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function (optional - for debugging)
function testEnrollment() {
  const testData = {
    name: "Test Student",
    email: "test@example.com",
    mobile: "+91 9876543210",
    course: "Java Programming"
  };
  
  addToSheet(testData);
  sendEmailNotification(testData);
  Logger.log("Test completed successfully");
}
