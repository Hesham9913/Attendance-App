// ✨ كود تحديث السرفيس ووركر وتشغيله فورًا
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg && reg.waiting) {
      // لو في نسخة جديدة مستنية، شغلها فورًا
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload(); // أعد تحميل الصفحة بعد التحديث
    }

    // لما يلاقي نسخة جديدة
    reg?.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          newWorker.postMessage({ type: 'SKIP_WAITING' });
          window.location.reload(); // أعد التحميل بعد التفعيل
        }
      });
    });

    // طلب التحديث يدويًا
    reg?.update();
  });
}



window.onload = function() {
  if (localStorage.getItem("loggedIn") === "true") {
    const role = localStorage.getItem("role");
    const fullname = localStorage.getItem("fullname");

    currentUser = { fullname: fullname, role: role };

    if (role === "employee") {
      document.getElementById("login-area").style.display = "none";
      document.getElementById("employee-area").style.display = "block";
      document.getElementById("empName").textContent = fullname;
      loadEmployeeAttendance(); // ✅ تحميل بيانات الحضور بعد الفتح
      loadDeductions(); // ✅ تحميل الخصومات بعد الريفريش
      document.getElementById("employee-deductions").style.display = "block";
      document.getElementById("employee-payslip").style.display = "block";

    } else if (role === "admin") {
      document.getElementById("login-area").style.display = "none";
      document.getElementById("admin-area").style.display = "block";
      loadAdminData();
    }
  }
};

const employeeFilter = new Choices('#employeeFilter', {
  removeItemButton: true,
  searchPlaceholderValue: 'Search employees...',
  shouldSort: false
});






const SUPABASE_URL = "https://inmklarxbvafddjllyga.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlubWtsYXJ4YnZhZmRkamxseWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjEzMTksImV4cCI6MjA1OTQ5NzMxOX0.5mxd8UTcJjx9KbIU1rVRV5czM9yxbOk2EYM7uBBT25E";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);

const allowedLocations = [
  { lat: 31.266795152125205, lng: 32.30827449591136, name: "Brooklyn's & Nino Jeans" },
  { lat: 31.266866357239714, lng: 32.312386134622024, name: "Central Perk" },
  { lat: 31.267093359092453, lng: 32.307928515920594, name: "Salah Salem" }, 
  { lat: 31.26703525960804, lng: 32.307971996158685, name: "Salah Salem" },
  { lat: 31.266389751928966, lng: 32.31425776481029, name: "Grand" }, 
  { lat: 30.105683348763584, lng: 31.630542758148366, name: "Madinty" }
];


const users = [
  { username: "Hesham", password: "Hesham9913", role: "admin", fullname: "Hesham" },
  { username: "Ahmed Hesham", password: "1234", role: "employee", fullname: "Ahmed Hesham" },
  { username: "Eslam Salem", password: "AL04987", role: "employee", fullname: "Eslam Salem" },
  { username: "Ahmed Ashraf", password: "HR81287", role: "employee", fullname: "Ahmed Ashraf" },
  { username: "Mohamed Salem", password: "HS10187", role: "employee", fullname: "Mohamed Salem" },
  { username: "Mohamed Nasser", password: "SS14485", role: "employee", fullname: "Mohamed Nasser" },
  { username: "Eslam Fawzy", password: "MS59071", role: "employee", fullname: "Eslam Fawzy" },
  { username: "Mohamed Refaat", password: "TA09546", role: "employee", fullname: "Mohamed Refaat" },
  { username: "Abdelazez Amar", password: "DA08331", role: "employee", fullname: "Abdelazez Amar" },
  { username: "Karem Amin", password: "NE44138", role: "employee", fullname: "Karem Amin" },
  { username: "Hassan Ashraf", password: "AR76093", role: "employee", fullname: "Hassan Ashraf" },
  { username: "Ibrahem Elkot", password: "EO50354", role: "employee", fullname: "Ibrahem Elkot" },
  { username: "Mohamed Mostafa", password: "SM29552", role: "employee", fullname: "Mohamed Mostafa" },
  { username: "Montaser", password: "RM82464", role: "employee", fullname: "Montaser" },
  { username: "Hady Abo El-Ezz", password: "AE75320", role: "employee", fullname: "Hady Abo El-Ezz" },
  { username: "Ahmed Ghazy", password: "YG49204", role: "employee", fullname: "Ahmed Ghazy" },
  { username: "Ahmed Khaled", password: "MD11878", role: "employee", fullname: "Ahmed Khaled" },
  { username: "Abd Elrahmen Samy", password: "ED93769", role: "employee", fullname: "Abd Elrahmen Samy" },
  { username: "Zayad Mahmoud", password: "ZA09150", role: "employee", fullname: "Zayad Mahmoud" },
  { username: "Yosef Abdelrahmen", password: "OA23759", role: "employee", fullname: "Yosef Abdelrahmen" },
  { username: "Mahmoud El-Hattab", password: "HA99664", role: "employee", fullname: "Mahmoud El-Hattab" },
  { username: "Hassan Hamam", password: "AH00169", role: "employee", fullname: "Hassan Hamam" },
  { username: "Moaz Ashrar", password: "AR89966", role: "employee", fullname: "Moaz Ashrar" },
  { username: "Omar Ataf", password: "AR07434", role: "employee", fullname: "Omar Ataf" },
  { username: "Mazen Elmasry", password: "EM78712", role: "employee", fullname: "Mazen Elmasry" },
  { username: "Mohamed Wafy", password: "EY97095", role: "employee", fullname: "Mohamed Wafy" },
  { username: "Beshoy Samy", password: "SM07919", role: "employee", fullname: "Beshoy Samy" },
  { username: "Abd Elrahmen Naser", password: "EA01488", role: "employee", fullname: "Abd Elrahmen Naser" },
  { username: "Samer Ibrahem", password: "EE26172", role: "employee", fullname: "Samer Ibrahem" },
  { username: "Mohamed Erfan", password: "EO82841", role: "employee", fullname: "Mohamed Erfan" },
  { username: "Mohamed Elsahy", password: "YA75415", role: "employee", fullname: "Mohamed Elsahy" },
  { username: "Marwan Amr", password: "AM90842", role: "employee", fullname: "Marwan Amr" },
  { username: "Mostafa Kfc", password: "AC18866", role: "employee", fullname: "Mostafa Kfc" },
  { username: "Abdo Gamal", password: "AB66153", role: "employee", fullname: "Abdo Gamal" },
  { username: "Dr Beshoy", password: "YO76055", role: "employee", fullname: "Dr Beshoy" },
  { username: "Mostafa Ragab", password: "AA12574", role: "employee", fullname: "Mostafa Ragab" },
  { username: "Farag Adam", password: "GM59744", role: "employee", fullname: "Farag Adam" },
  { username: "Islam Zakrya", password: "AI44179", role: "employee", fullname: "Islam Zakrya" },
  { username: "Abd El-Malek", password: "LE72366", role: "employee", fullname: "Abd El-Malek" },
  { username: "Ahmed Tarek", password: "DM92779", role: "employee", fullname: "Ahmed Tarek" },
  { username: "Ahmed Mahmoud", password: "EH06893", role: "employee", fullname: "Ahmed Mahmoud" },
  { username: "Esha", password: "AS92708", role: "employee", fullname: "Esha" },
  { username: "Adel", password: "LA96275", role: "employee", fullname: "Adel" },
  { username: "Hamoda", password: "AD24034", role: "employee", fullname: "Hamoda" },
  { username: "Sheref Elrfaay", password: "RE35417", role: "employee", fullname: "Sheref Elrfaay" },
  { username: "Sameh Mohamed", password: "EM90993", role: "employee", fullname: "Sameh Mohamed" },
  { username: "Mohamed El-Refaie", password: "HI71328", role: "employee", fullname: "Mohamed El-Refaie" },
  { username: "Mohmed Tarek", password: "MA88335", role: "employee", fullname: "Mohmed Tarek" },
  { username: "Ashraf Salem", password: "HM16794", role: "employee", fullname: "Ashraf Salem" },
  { username: "Ibrahem Mosaad", password: "AM98147", role: "employee", fullname: "Ibrahem Mosaad" },
  { username: "Zeina Elkhouly", password: "NL79133", role: "employee", fullname: "Zeina Elkhouly" },
  { username: "Mohamed Abo Elfotoh", password: "AO75762", role: "employee", fullname: "Mohamed Abo Elfotoh" },
  { username: "Ahmed Onsy", password: "NS97088", role: "employee", fullname: "Ahmed Onsy" },
  { username: "Samer Fayez", password: "AM37899", role: "employee", fullname: "Samer Fayez" },
  { username: "Elsaid Saleh", password: "IE85995", role: "employee", fullname: "Elsaid Saleh" },
  { username: "Modaser Helmy", password: "MO22070", role: "employee", fullname: "Modaser Helmy" },
  { username: "Mohamed Ragab", password: "DA90578", role: "employee", fullname: "Mohamed Ragab" },
  { username: "Abeer Mohamed", password: "EM27648", role: "employee", fullname: "Abeer Mohamed" },
  { username: "Omnia Hatem", password: "OT64328", role: "employee", fullname: "Omnia Hatem" },
  { username: "Samah Mohamed", password: "HA56937", role: "employee", fullname: "Samah Mohamed" },
  { username: "Mirna Ashraf", password: "IA16093", role: "employee", fullname: "Mirna Ashraf" },
  { username: "Yasmen Mahmoud", password: "MA13792", role: "employee", fullname: "Yasmen Mahmoud" },
  { username: "Alyaa Reda", password: "AD74788", role: "employee", fullname: "Alyaa Reda" },
  { username: "Islam Ibrahem", password: "AM27678", role: "employee", fullname: "Islam Ibrahem" },
  { username: "Mohamed Yasser", password: "OA18178", role: "employee", fullname: "Mohamed Yasser" },
  { username: "Jena William", password: "LL24851", role: "employee", fullname: "Jena William" },
  { username: "Abdelrahman Fahmy", password: "AH10460", role: "employee", fullname: "Abdelrahman Fahmy" },
  { username: "Engy William", password: "LI40276", role: "employee", fullname: "Engy William" },
  { username: "Moaz Alewa", password: "LW74122", role: "employee", fullname: "Moaz Alewa" },
  { username: "Mazen Mamdoh", password: "MA69497", role: "employee", fullname: "Mazen Mamdoh" },
  { username: "Mostafa Roshdy", password: "DA92119", role: "employee", fullname: "Mostafa Roshdy" },
  { username: "Hassan Abo Saleh", password: "AH78963", role: "employee", fullname: "Hassan Abo Saleh" },
  { username: "Abdelrahman Samer", password: "HR19338", role: "employee", fullname: "Abdelrahman Samer" },
  { username: "Amr El-Shaarawy", password: "AH85417", role: "employee", fullname: "Amr El-Shaarawy" },
  { username: "Karem Reda", password: "RE70119", role: "employee", fullname: "Karem Reda" },
  { username: "Youssef Farag", password: "EY72001", role: "employee", fullname: "Youssef Farag" },
  { username: "Mohamed Ayaad", password: "AA89997", role: "employee", fullname: "Mohamed Ayaad" },
  { username: "Mahmoud Awad", password: "DW78983", role: "employee", fullname: "Mahmoud Awad" },
  { username: "Mohamed El-Kholany", password: "EL41746", role: "employee", fullname: "Mohamed El-Kholany" },
  { username: "Rafy Hany", password: "HY15725", role: "employee", fullname: "Rafy Hany" },
  { username: "Ehab Deyab", password: "AE09077", role: "employee", fullname: "Ehab Deyab" },
  { username: "Ahmed Rizk", password: "IR82805", role: "employee", fullname: "Ahmed Rizk" },
  { username: "Mahmoud Salama", password: "AS78965", role: "employee", fullname: "Mahmoud Salama" },
  { username: "Zeyad Ashraf", password: "AF69080", role: "employee", fullname: "Zeyad Ashraf" },
  { username: "Omar Hassanen", password: "HM69420", role: "employee", fullname: "Omar Hassanen" },
  { username: "Ahmed Abd Elsalam", password: "AA58986", role: "employee", fullname: "Ahmed Abd Elsalam" },
  { username: "Mohamed Samy", password: "SM98060", role: "employee", fullname: "Mohamed Samy" },
  { username: "Essam Ahmed", password: "ES26038", role: "employee", fullname: "Essam Ahmed" },
  { username: "Karem Hamed", password: "EM25524", role: "employee", fullname: "Karem Hamed" },
  { username: "Ashraf Hamdon", password: "OR68078", role: "employee", fullname: "Ashraf Hamdon" },
  { username: "Ibrahem Mishkak", password: "HH39034", role: "employee", fullname: "Ibrahem Mishkak" },
  { username: "Mahmoud Elhamamsy", password: "AA44987", role: "employee", fullname: "Mahmoud Elhamamsy" },
  { username: "Ahmed Elhamamsy", password: "HE19926", role: "employee", fullname: "Ahmed Elhamamsy" },
  { username: "Fars Ammar", password: "AR85177", role: "employee", fullname: "Fars Ammar" },
  { username: "Mohamed Osama", password: "HA41434", role: "employee", fullname: "Mohamed Osama" },
  { username: "Anton Samy", password: "AO12223", role: "employee", fullname: "Anton Samy" },
  { username: "Fatma Mohamed", password: "FM94706", role: "employee", fullname: "Fatma Mohamed" },
  { username: "Ahmed Elsawaf", password: "SH43601", role: "employee", fullname: "Ahmed Elsawaf" },
  { username: "Rafat", password: "TA78223", role: "employee", fullname: "Rafat" },
  { username: "Mohame Awad", password: "MA08415", role: "employee", fullname: "Mohame Awad" },
  { username: "Elfalah", password: "FE17122", role: "employee", fullname: "Elfalah" },
  { username: "Hosam Hasan", password: "HA48527", role: "employee", fullname: "Hosam Hasan" },
  { username: "Ibrahem Shalby", password: "HE66996", role: "employee", fullname: "Ibrahem Shalby" },
  { username: "Abdalla Gamal", password: "BA64690", role: "employee", fullname: "Abdalla Gamal" },
  { username: "Ahmed Tawfyk", password: "AH95587", role: "employee", fullname: "Ahmed Tawfyk" },
  { username: "Abdalla Morsy", password: "YB91676", role: "employee", fullname: "Abdalla Morsy" },
  { username: "Karem Elbasha", password: "KE36798", role: "employee", fullname: "Karem Elbasha" },
  { username: "Amin Wagdy", password: "AA99815", role: "employee", fullname: "Amin Wagdy" },
  { username: "Ibrahim Ahmed", password: "IM26481", role: "employee", fullname: "Ibrahim Ahmed" },
  { username: "Amin Metwally", password: "YT34128", role: "employee", fullname: "Amin Metwally" },
  { username: "Mahmoud Ashraf", password: "HF81649", role: "employee", fullname: "Mahmoud Ashraf" },
  
];

let currentUser = null;
const adminPassword = "Hesham9913"; // باسورد الأدمن

let employeeAttendanceCache = []; // 🗂️ هيبقى فيه كل سجلات حضور الموظف

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Invalid credentials!");
    return;
  }

  currentUser = user;
  document.getElementById("login-area").style.display = "none";

  if (user.role === "employee") {
    document.getElementById("employee-area").style.display = "block";
    document.getElementById("empName").textContent = user.fullname;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "employee");
    localStorage.setItem("fullname", user.fullname);
    localStorage.setItem("username", user.username); // ✅ ضروري للخصومات

    loadEmployeeAttendance(); // ✅ تحميل الحضور
    loadDeductions(); // ✅ تحميل الخصومات من Google Sheet
    document.getElementById("employee-deductions").style.display = "block"; // ✅ عرض جدول الخصومات
    document.getElementById("employee-payslip").style.display = "block"; // ✨ عرض جدول المرتب


  } else if (user.role === "admin") {
    document.getElementById("admin-area").style.display = "block";
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "admin");
    localStorage.setItem("fullname", user.fullname);
    loadAdminData(); // ✅ تحميل بيانات الأدمن فقط
  }
}



async function loadEmployeeAttendance() {
  const employeeRecordsDiv = document.getElementById('employee-records');
  const employeeTableBody = document.querySelector('#employeeTable tbody');

  employeeTableBody.innerHTML = '';

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const { data: records, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('employee_name', currentUser.fullname);

  if (error) {
    console.error('❌ Error loading employee attendance:', error);
    return;
  }

  employeeAttendanceCache = records;

  // DEBUG
  console.log("📦 All records:", records);
  console.log("📅 Filtering from:", startOfMonth.toISOString(), "to:", endOfMonth.toISOString());

  const filteredRecords = records.filter(record => {
    if (!record.check_in) return false;
    const checkInDate = new Date(record.check_in);
    // remove time part by resetting hours
    checkInDate.setHours(0, 0, 0, 0);
    const start = new Date(startOfMonth);
    const end = new Date(endOfMonth);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return checkInDate >= start && checkInDate <= end;
  });

  // DEBUG
  console.log("✅ Filtered records:", filteredRecords);

  filteredRecords.forEach(record => {
    const row = document.createElement('tr');

    const dayCell = document.createElement('td');
    dayCell.textContent = record.check_in ? new Date(record.check_in).getDate() : '-';
    dayCell.style.padding = '10px';
    dayCell.style.textAlign = 'center';
    row.appendChild(dayCell);

    const checkInCell = document.createElement('td');
    checkInCell.textContent = record.check_in ? new Date(record.check_in).toLocaleString('en-GB', {
      timeZone: 'Africa/Cairo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) : '-';
    checkInCell.style.padding = '10px';
    checkInCell.style.textAlign = 'center';

    const checkOutCell = document.createElement('td');
    checkOutCell.textContent = record.check_out ? new Date(record.check_out).toLocaleString('en-GB', {
      timeZone: 'Africa/Cairo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }) : '-';
    checkOutCell.style.padding = '10px';
    checkOutCell.style.textAlign = 'center';

    row.appendChild(checkInCell);
    row.appendChild(checkOutCell);

    employeeTableBody.appendChild(row);
  });

  if (filteredRecords.length > 0) {
    employeeRecordsDiv.style.display = 'block';
  } else {
    employeeRecordsDiv.style.display = 'none';
  }
}


async function loadDeductions() {
  const currentEmployee = localStorage.getItem("fullname");

  // 👇 نضيف رقم عشوائي لمنع الكاش
  const url = "https://script.google.com/macros/s/AKfycbzRmGT4gyWdeBZqERZHsrRBEY8ZMZKxNg600eF7qdvExYG1L_5jO1pt2KrLvUdS8H0cZA/exec?t=" + Date.now();
  
  const response = await fetch(url, { cache: "no-store" }); // 👈 برضو نمنع التخزين المؤقت
  const data = await response.json();

  const filtered = data.filter(row => row.employee_name?.trim() === currentEmployee?.trim());

  const tbody = document.querySelector("#deductionsTable tbody");
  tbody.innerHTML = "";

  if (filtered.length === 0) {
    document.getElementById("employee-deductions").style.display = "none";
    return;
  }

  document.getElementById("employee-deductions").style.display = "block";

  filtered.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${record.amount}</td>
      <td>${record.reason}</td>
    `;
    tbody.appendChild(row);
  });
}





function requestAdminPasswordBeforeLogout() {
  const enteredPassword = prompt("Please enter admin password to logout:");

  if (enteredPassword === null) {
    // المستخدم لغى
    return;
  }

  if (enteredPassword === adminPassword) {
    logout(); // لو الباسورد صح
  } else {
    alert("❌ Wrong admin password. Logout cancelled.");
  }
}


function logout() {
  localStorage.clear();
  location.reload();
}

async function loadAdminData() {
  const { data: records, error } = await supabase
    .from('attendance')
    .select('*')
    .order('check_in', { ascending: true });

  if (error) {
    alert('❌ Error loading data!');
    console.error(error);
    return;
  }

  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  // تجهيز قائمة الموظفين للفلاتر
  const uniqueEmployees = [...new Set(records.map(r => r.employee_name))];
  employeeFilter.clearChoices();
  employeeFilter.setChoices(
    uniqueEmployees.map(name => ({ value: name, label: name })),
    'value',
    'label',
    false
  );

  records.forEach(record => {
    const row = document.createElement("tr");

    [
      record.employee_name,
      record.check_in,
      record.check_in_location,
      record.check_out,
      record.check_out_location
    ].forEach((field, index) => {
      const td = document.createElement("td");

      if ((index === 1 || index === 3) && field) {
        // تنسيق Check In أو Check Out
        td.textContent = new Date(field).toLocaleString('en-GB', {
          timeZone: 'Africa/Cairo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      } else if (index === 3 && !field) {
        // ✅ Check Out فاضي → حط زرار إضافة Check Out
        const btn = document.createElement("button");
        btn.textContent = "🕓";
        btn.title = "Add Check Out Time";
        btn.onclick = () => openTimePickerPopup(record.id);
        td.appendChild(btn);
      } else {
        td.textContent = field || "";
      }

      td.contentEditable = true;

      td.addEventListener("blur", async () => {
        const newEmployee = row.cells[0].textContent.trim();
        const newCheckIn = row.cells[1].textContent.trim();
        const newCheckInLocation = row.cells[2].textContent.trim();
        const newCheckOut = row.cells[3].textContent.trim();
        const newCheckOutLocation = row.cells[4].textContent.trim();

        await updateRecord(record.id, newEmployee, newCheckIn, newCheckOut, newCheckInLocation, newCheckOutLocation);
      });

      row.appendChild(td);
    });

    // زرار مسح السطر
    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = async () => {
      if (confirm("Are you sure you want to delete this record?")) {
        await deleteRecord(record.id);
        row.remove();
      }
    };
    deleteTd.appendChild(deleteBtn);
    row.appendChild(deleteTd);

    tbody.appendChild(row);
  });
}



async function updateRecord(id, employeeName = null, checkIn = null, checkOut = null, checkInLocation = null, checkOutLocation = null) {
  const updates = {};

  if (employeeName !== null) updates.employee_name = employeeName;
  if (checkIn !== null) updates.check_in = checkIn ? new Date(checkIn).toISOString() : null;
  if (checkOut !== null) updates.check_out = checkOut ? new Date(checkOut).toISOString() : null;
  if (checkInLocation !== null) updates.check_in_location = checkInLocation;
  if (checkOutLocation !== null) updates.check_out_location = checkOutLocation;

  const { error } = await supabase
    .from('attendance')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('❌ Error updating record:', error);
    alert('❌ Failed to update record.');
  }
}



async function deleteRecord(id) {
  const { error } = await supabase
    .from('attendance')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Error deleting record:', error);
    alert('❌ Failed to delete record.');
  }
}

function isWithinRange(position) {
  const maxDistance = 20; // مسافة السماح (متر)

  let nearestBranch = null;
  let nearestDistance = Infinity;

  for (const loc of allowedLocations) {
    const allowedLat = loc.lat;
    const allowedLng = loc.lng;
    const R = 6371e3; // نصف قطر الأرض بالمتر

    const φ1 = position.coords.latitude * Math.PI / 180;
    const φ2 = allowedLat * Math.PI / 180;
    const Δφ = (allowedLat - position.coords.latitude) * Math.PI / 180;
    const Δλ = (allowedLng - position.coords.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    if (distance < nearestDistance) {
      nearestBranch = loc.name;
      nearestDistance = distance;
    }
  }

  return {
    branchName: nearestBranch,
    distance: Math.round(nearestDistance)
  };
}

// دالة لإظهار الـ Loading Indicator
function showLoading() {
  document.getElementById("loadingIndicator").style.display = "block";
}

// دالة لإخفاء الـ Loading Indicator
function hideLoading() {
  document.getElementById("loadingIndicator").style.display = "none";
}

async function checkIn() {
  showLoading(); // نظهر الـ Loading Indicator

  // ✨ أول حاجة نعد كام Check In حصل النهاردة
  const todayCheckIns = countTodayCheckIns();
  if (todayCheckIns >= 2) {
    alert("⚠️ انت النهاردة بصمت مرتين حضور متتعبناش. روح كلم مديرك");
    hideLoading();
    return; // نوقف العملية
  }
  
  // باقي الكود زي ما هو (نخش بعدين على الـ geolocation والحاجات دي)

  
  navigator.geolocation.getCurrentPosition(async position => {
    const result = isWithinRange(position);
    const maxDistance = 20; // ✨ السماح حتى 20 متر
    if (result) {
      const { branchName, distance } = result;
      if (distance <= maxDistance) {
        const { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('employee_name', currentUser.fullname)
          .is('check_out', null); // ✨ هات كل اللي ملوش Check Out
        if (error) {
          alert("❌ Error checking previous records!");
          console.error(error);
          hideLoading(); // نخفي الـ Loading Indicator
          return;
        }
        if (data.length > 0) {
          alert("⚠️ يا معلم ما انت باصم حضور شغل مخك. لازم تعمل انصراف الاول");
          hideLoading(); // نخفي الـ Loading Indicator
          return;
        }
        await saveCheckIn(currentUser.fullname, branchName);
        alert(`✅ احلى حضور على عنيك ! انت ${distance} meters بعيد عن ${branchName}.`);
        loadEmployeeAttendance();
      } else {
        alert(`❌ انت ${distance} meters بعيد عن ${branchName}. اتحرك شوية و قرب من الفرع و اقفل النت و افتحه تاني عشان الgps يعمل ريفريش`);
      }
    } else {
      alert("❌ Location detection failed.");
    }
    hideLoading(); // نخفي الـ Loading Indicator
  }, error => {
    alert("❌ ياعم ما تفتح اللوكيشن الاول متتعبناش معاك");
    hideLoading(); // نخفي الـ Loading Indicator
  });
}

function checkOut() {
  showLoading(); // نظهر الـ Loading Indicator

  navigator.geolocation.getCurrentPosition(async position => {
    const result = isWithinRange(position);
    const maxDistance = 20; // ✨ السماح حتى 20 متر
    if (result) {
      const { branchName, distance } = result;
      if (distance <= maxDistance) {
        const { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('employee_name', currentUser.fullname)
          .is('check_out', null)
          .order('check_in', { ascending: true }); // ✨ خد أقدم Check In مفتوح
        if (error) {
          alert("❌ Error checking previous records!");
          console.error(error);
          hideLoading(); // نخفي الـ Loading Indicator
          return;
        }
        if (data.length === 0) {
          alert("⚠️ طيب بعقلك كده ينفع حد يعمل انصراف من غير ما يعمل حضور ؟ ما انت مبصمتش حضووووور!");
          hideLoading(); // نخفي الـ Loading Indicator
          return;
        }
        // ✨ نعمل Check Out لأقدم واحد مفتوح
        const openRecord = data[0];
        const { error: checkoutError } = await supabase
          .rpc('set_checkout_time', {
            emp_name: currentUser.fullname,
            loc_name: branchName
          });
        if (checkoutError) {
          console.error('❌ Error during Check Out RPC:', checkoutError);
          alert('❌ Failed to Check Out.');
          hideLoading(); // نخفي الـ Loading Indicator
          return;
        }
        alert(`✅ احلى انصراف على عنيك ! انت ${distance} meters بعيد ${branchName}.`);
        loadEmployeeAttendance();
      } else {
        alert(`❌ انت ${distance} meters بعيد عن ${branchName}. اتحرك شوية و قرب من الفرع و اقفل النت و افتحه تاني عشان الgps يعمل ريفريش`);
      }
    } else {
      alert("❌ ياعم ما تفتح اللوكيشن الاول متتعبناش معاك");
    }
    hideLoading(); // نخفي الـ Loading Indicator
  });
}


function countTodayCheckIns() {
  const today = new Date().toISOString().split('T')[0]; // تاريخ اليوم بالصيغة yyyy-mm-dd

  const todayCheckIns = employeeAttendanceCache.filter(record => {
    if (!record.check_in) return false;
    const recordDate = new Date(record.check_in).toISOString().split('T')[0];
    return recordDate === today;
  });

  return todayCheckIns.length;
}

// ✅ Check In - حفظ اسم الموظف والمكان فقط (الوقت يتسجل تلقائي من السيرفر)
async function saveCheckIn(employeeName, locationName) {
  const { error } = await supabase
    .from('attendance')
    .insert([
      { 
        employee_name: employeeName,
        check_in_location: locationName
      }
    ]);

  if (error) {
    console.error('❌ Error during Check In:', error);
    alert('❌ Failed to Check In.');
  }
}

async function saveCheckOut(employeeName, locationName) {
  const { error } = await supabase
    .rpc('set_checkout_time', {
      emp_name: employeeName,
      loc_name: locationName
    });

  if (error) {
    console.error('❌ Error during Check Out RPC:', error);
    alert('❌ Failed to Check Out.');
  }
}


async function downloadReport() {
  const selectedEmployees = employeeFilter.getValue().map(emp => emp.value);
  const startDate = document.getElementById("startDateFilter").value;
  const endDate = document.getElementById("endDateFilter").value;

  const { data: records, error } = await supabase
    .from('attendance')
    .select('*');

  if (error) {
    alert('❌ Error loading data for report!');
    console.error(error);
    return;
  }

  let filtered = records;

  if (selectedEmployees.length > 0) {
    filtered = filtered.filter(r => selectedEmployees.includes(r.employee_name));
  }

  if (startDate && endDate) {
    filtered = filtered.filter(r => {
      if (!r.check_in) return false;
      const recordDate = new Date(r.check_in).toISOString().split('T')[0];
      return recordDate >= startDate && recordDate <= endDate;
    });
  }

  if (filtered.length === 0) {
    alert("⚠️ No records found for selected filters!");
    return;
  }

  let csvContent = "Employee,Check In,Check In Location,Check Out,Check Out Location\n";

  filtered.forEach(record => {
    const employee = record.employee_name || "";
    const checkIn = record.check_in ? new Date(record.check_in).toLocaleString() : "";
    const checkInLoc = record.check_in_location || "";
    const checkOut = record.check_out ? new Date(record.check_out).toLocaleString() : "";
    const checkOutLoc = record.check_out_location || "";

    csvContent += `"${employee}","${checkIn}","${checkInLoc}","${checkOut}","${checkOutLoc}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "attendance_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


async function applyFilters() {
  const selectedEmployees = employeeFilter.getValue().map(emp => emp.value);
  const startDate = document.getElementById("startDateFilter").value;
  const endDate = document.getElementById("endDateFilter").value;

  const { data: records, error } = await supabase
    .from('attendance')
    .select('*');

  if (error) {
    alert('❌ Error loading data!');
    console.error(error);
    return;
  }

  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  let filtered = records;

  // فلترة الموظفين
  if (selectedEmployees.length > 0) {
    filtered = filtered.filter(r => selectedEmployees.includes(r.employee_name));
  }

  // فلترة التواريخ
  if (startDate && endDate) {
    filtered = filtered.filter(r => {
      if (!r.check_in) return false;
      const recordDate = new Date(r.check_in).toISOString().split('T')[0];
      return recordDate >= startDate && recordDate <= endDate;
    });
  }

  filtered.forEach(record => {
    const row = document.createElement("tr");

    const employeeCell = document.createElement("td");
    employeeCell.textContent = record.employee_name || "";
    row.appendChild(employeeCell);

    const checkInCell = document.createElement("td");
    checkInCell.textContent = record.check_in ? new Date(record.check_in).toLocaleString() : "";
    row.appendChild(checkInCell);

    const checkInLocationCell = document.createElement("td");
    checkInLocationCell.textContent = record.check_in_location || "";
    row.appendChild(checkInLocationCell);

    const checkOutCell = document.createElement("td");
    checkOutCell.textContent = record.check_out ? new Date(record.check_out).toLocaleString() : "";
    row.appendChild(checkOutCell);

    const checkOutLocationCell = document.createElement("td");
    checkOutLocationCell.textContent = record.check_out_location || "";
    row.appendChild(checkOutLocationCell);

    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      if (confirm("Are you sure you want to delete this record?")) {
        await deleteRecord(record.id);
        row.remove();
      }
    };
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  });
}



async function addNewRecord() {
  const tbody = document.querySelector("#attendanceTable tbody");

  const row = document.createElement("tr");

  // --- خانة الموظف - Dropdown ---
  const nameCell = document.createElement("td");
  const select = document.createElement("select");
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.fullname;
    option.textContent = user.fullname;
    select.appendChild(option);
  });
  nameCell.appendChild(select);
  row.appendChild(nameCell);

  // --- خانة Check In - تاريخ + ساعة ---
  const checkInCell = document.createElement("td");
  const checkInDate = document.createElement("input");
  checkInDate.type = "date";
  const checkInTime = document.createElement("input");
  checkInTime.type = "time";
  checkInCell.appendChild(checkInDate);
  checkInCell.appendChild(checkInTime);
  row.appendChild(checkInCell);

  // --- خانة Check In Location - Dropdown ---
  const checkInLocCell = document.createElement("td");
  const checkInLocSelect = document.createElement("select");
  allowedLocations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc.name;
    option.textContent = loc.name;
    checkInLocSelect.appendChild(option);
  });
  checkInLocCell.appendChild(checkInLocSelect);
  row.appendChild(checkInLocCell);

  // --- خانة Check Out - تاريخ + ساعة ---
  const checkOutCell = document.createElement("td");
  const checkOutDate = document.createElement("input");
  checkOutDate.type = "date";
  const checkOutTime = document.createElement("input");
  checkOutTime.type = "time";
  checkOutCell.appendChild(checkOutDate);
  checkOutCell.appendChild(checkOutTime);
  row.appendChild(checkOutCell);

  // --- خانة Check Out Location - Dropdown ---
  const checkOutLocCell = document.createElement("td");
  const checkOutLocSelect = document.createElement("select");
  allowedLocations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc.name;
    option.textContent = loc.name;
    checkOutLocSelect.appendChild(option);
  });
  checkOutLocCell.appendChild(checkOutLocSelect);
  row.appendChild(checkOutLocCell);

  // --- زر الحفظ ---
  const actionCell = document.createElement("td");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.onclick = async () => {
    const employeeName = select.value;
    const checkIn = new Date(`${checkInDate.value}T${checkInTime.value}`).toISOString();
    const checkOut = (checkOutDate.value && checkOutTime.value) ? 
      new Date(`${checkOutDate.value}T${checkOutTime.value}`).toISOString() : null;
    const checkInLocation = checkInLocSelect.value || null;
    const checkOutLocation = checkOutLocSelect.value || null;

    const { error } = await supabase.from("attendance").insert([{
      employee_name: employeeName,
      check_in: checkIn,
      check_in_location: checkInLocation,
      check_out: checkOut,
      check_out_location: checkOutLocation
    }]);

    if (error) {
      alert("❌ Error saving record.");
      console.error(error);
    } else {
      alert("✅ Record added successfully!");
      loadAdminData(); // Refresh the table
    }
  };

  actionCell.appendChild(saveBtn);
  row.appendChild(actionCell);

  tbody.appendChild(row);
}


async function downloadReport() {
  const selectedEmployees = employeeFilter.getValue().map(emp => emp.value);
  const startDate = document.getElementById("startDateFilter").value;
  const endDate = document.getElementById("endDateFilter").value;

  const { data: records, error } = await supabase
    .from('attendance')
    .select('*');

  if (error) {
    alert('❌ Error loading data for report!');
    console.error(error);
    return;
  }

  let filtered = records;

  if (selectedEmployees.length > 0) {
    filtered = filtered.filter(r => selectedEmployees.includes(r.employee_name));
  }

  if (startDate && endDate) {
    filtered = filtered.filter(r => {
      if (!r.check_in) return false;
      const recordDate = new Date(r.check_in).toISOString().split('T')[0];
      return recordDate >= startDate && recordDate <= endDate;
    });
  }

  if (filtered.length === 0) {
    alert("⚠️ No records found for selected filters!");
    return;
  }

  let csvContent = "Employee,Check In,Check In Location,Check Out,Check Out Location\n";

  filtered.forEach(record => {
    const employee = record.employee_name || "";
    const checkIn = formatDateForReport(record.check_in);
    const checkInLoc = record.check_in_location || "";
    const checkOut = formatDateForReport(record.check_out);
    const checkOutLoc = record.check_out_location || "";

    csvContent += `"${employee}","${checkIn}","${checkInLoc}","${checkOut}","${checkOutLoc}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "attendance_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ✨ دالة تنسيق التاريخ:
function formatDateForReport(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function resetFilters() {
  // امسح التاريخين
  document.getElementById("startDateFilter").value = "";
  document.getElementById("endDateFilter").value = "";

  // امسح الموظفين المختارين
  employeeFilter.removeActiveItems(); // Choices.js دالة جاهزة تمسح كل المختار

  // رجّع كل الداتا تاني
  loadAdminData();
}

function openTimePickerPopup(recordId) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  const popup = document.createElement("div");
  popup.style.background = "#fff";
  popup.style.padding = "20px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  popup.innerHTML = `
    <h3 style="margin-top:0;">🕓 Add Check Out Time</h3>
    <label>Date: <input type="date" id="popupDate"></label><br><br>
    <label>Time: <input type="time" id="popupTime"></label><br><br>
    <button id="popupSaveBtn">💾 Save</button>
    <button id="popupCancelBtn">❌ Cancel</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  document.getElementById("popupCancelBtn").onclick = () => {
    document.body.removeChild(overlay);
  };

  document.getElementById("popupSaveBtn").onclick = async () => {
    const date = document.getElementById("popupDate").value;
    const time = document.getElementById("popupTime").value;

    if (date && time) {
      const fullDate = new Date(`${date}T${time}:00`);
      if (!isNaN(fullDate)) {
        await updateRecord(recordId, null, null, fullDate.toISOString(), null, null);
        loadAdminData();
        document.body.removeChild(overlay);
      } else {
        alert("❌ Invalid date or time!");
      }
    } else {
      alert("❌ Please fill both date and time.");
    }
  };
}

let employeePayslipHtml = "";

async function fetchPayslip() {
  const fullname = currentUser?.fullname;
  if (!fullname) return alert("❌ لا يوجد اسم موظف");

  const url = "https://inmklarxbvafddjllyga.supabase.co/functions/v1/payroll_refresh";

  const response = await fetch(url);
  const data = await response.json();

  const matched = data.find(p => p.employee_id?.[1] === fullname && p.x_studio_monthly_report);

  if (!matched) {
    alert("❌ لا يوجد تقرير مرتب لك حتى الآن");
    return;
  }

  employeePayslipHtml = matched.x_studio_monthly_report;
  document.getElementById("showPayslipBtn").style.display = "inline-block";
  document.getElementById("employee-payslip").style.display = "block";
  alert("✅ تم تحميل تقرير المرتب. اضغط Show Payslip لعرضه.");
}

function showPayslip() {
  const container = document.getElementById("payslipContent");
  container.innerHTML = employeePayslipHtml;
  container.style.display = "block";
}
