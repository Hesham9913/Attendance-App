// ✨ كود تحديث السرفيس ووركر وتشغيله فورًا + إجبار التحديث في iOS
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(reg => {
    if (reg) {
      // 💥 Force update يدوي لأي جهاز (خصوصًا iOS)
      reg.update();

      if (reg.waiting) {
        // لو في نسخة جديدة مستنية، شغلها فورًا
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload(); // أعد تحميل الصفحة بعد التحديث
      }

      // لما يلاقي نسخة جديدة
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload(); // أعد التحميل بعد التفعيل
          }
        });
      });
    }
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
  { username: "Moaz Ashraf", password: "AR89966", role: "employee", fullname: "Moaz Ashraf" },
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
  { username: "Sameh Mohamed", password: "EM90993", role: "admin", fullname: "Sameh Mohamed" },
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
  { username: "Aliaa Zakaria", password: "AD74788", role: "employee", fullname: "Aliaa Zakaria" },
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
  { username: "Amin Wagdy", password: "AA99815", role: "admin", fullname: "Amin Wagdy" },
  { username: "Ibrahim Ahmed", password: "IM26481", role: "employee", fullname: "Ibrahim Ahmed" },
  { username: "Amin Metwally", password: "YT34128", role: "employee", fullname: "Amin Metwally" },
  { username: "Mahmoud Ashraf", password: "HF81649", role: "employee", fullname: "Mahmoud Ashraf" },
  { username: "Salem Mohamed", password: "LO43628", role: "employee", fullname: "Salem Mohamed" },
  { username: "Mohamed Ebn Samy", password: "ES43621", role: "employee", fullname: "Mohamed Ebn Samy" },
  { username: "Mohamed Talaat", password: "HT74658", role: "employee", fullname: "Mohamed Talaat" },
  { username: "Mohamed Alewa", password: "DW54392", role: "employee", fullname: "Mohamed Alewa" },
  { username: "Zeyad Mashally", password: "ZS93526", role: "employee", fullname: "Zeyad Mashally" },
  { username: "Abdallah El-Maghraby", password: "DG85362", role: "employee", fullname: "Abdallah El-Maghraby" },
  { username: "Ahmed El-Sayed", password: "LS72361", role: "employee", fullname: "Ahmed El-Sayed" },
  { username: "Soliman Ragab", password: "IB37458", role: "employee", fullname: "Soliman Ragab" },
  { username: "Ahmed Osama", password: "HO41578", role: "employee", fullname: "Ahmed Osama" },
  { username: "Adam El-Tabaay", password: "MT36218", role: "employee", fullname: "Adam El-Tabaay" },
  { username: "Nofer Hany", password: "NH42687", role: "employee", fullname: "Nofer Hany" },
  { username: "Ahmed Amr", password: "DA65227", role: "employee", fullname: "Ahmed Amr" },
  
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
    document.getElementById("employee-payslip").style.display = "block"; // ✨ عرض جدول المرتب


  } else if (user.role === "admin") {
    document.getElementById("admin-area").style.display = "block";
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", "admin");
    localStorage.setItem("fullname", user.fullname);
    loadAdminData(); // ✅ تحميل بيانات الأدمن فقط
  }
}

function formatDateCairo(dateString) {
  if (!dateString) return "";
  const options = {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const date = new Date(dateString);
  const parts = new Intl.DateTimeFormat('en-GB', options).formatToParts(date);
  const lookup = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day} ${lookup.hour}:${lookup.minute}`;
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

  const filteredRecords = records.filter(record => {
    if (!record.check_in) return false;
    const checkInDate = new Date(record.check_in);
    checkInDate.setHours(0, 0, 0, 0);
    const start = new Date(startOfMonth);
    const end = new Date(endOfMonth);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return checkInDate >= start && checkInDate <= end;
  });

  // ✅ ترتيب حسب check_in من الأقدم للأحدث
  filteredRecords.sort((a, b) => new Date(a.check_in) - new Date(b.check_in));

  filteredRecords.forEach(record => {
    const row = document.createElement('tr');

    const dayCell = document.createElement('td');
    dayCell.textContent = record.check_in ? new Date(record.check_in).getDate() : '-';
    dayCell.style.padding = '10px';
    dayCell.style.textAlign = 'center';
    row.appendChild(dayCell);

    const checkInCell = document.createElement('td');
    checkInCell.textContent = formatDateCairo(record.check_in) || '-';
    checkInCell.style.padding = '10px';
    checkInCell.style.textAlign = 'center';

    const checkOutCell = document.createElement('td');
    checkOutCell.textContent = formatDateCairo(record.check_out) || '-';
    checkOutCell.style.padding = '10px';
    checkOutCell.style.textAlign = 'center';

    row.appendChild(checkInCell);
    row.appendChild(checkOutCell);

    employeeTableBody.appendChild(row);
  });

  employeeRecordsDiv.style.display = filteredRecords.length > 0 ? 'block' : 'none';
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

let allAttendanceRecords = [];
let uniqueDates = [];
let currentDayIndex = 0;

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

  // تخزين كل البيانات في المتغير العالمي
  allAttendanceRecords = records;

  // استخراج كل الأيام المميزة
  const dateSet = new Set();
  records.forEach(r => {
    if (r.check_in) {
      const date = new Date(r.check_in).toISOString().split("T")[0];
      dateSet.add(date);
    }
  });

  uniqueDates = Array.from(dateSet).sort(); // ترتيب الأيام
  currentDayIndex = 0; // نبدأ من أول يوم

  renderAdminTableForDay(currentDayIndex);

  // تجهيز الفلاتر
  const uniqueEmployees = [...new Set(records.map(r => r.employee_name))];
  employeeFilter.clearChoices();
  employeeFilter.setChoices(
    uniqueEmployees.map(name => ({ value: name, label: name })),
    'value',
    'label',
    false
  );
}

function renderAdminTableForDay(dayIndex) {
  const tbody = document.querySelector("#attendanceTable tbody");
  const date = uniqueDates[dayIndex];
  tbody.innerHTML = "";

  const filtered = allAttendanceRecords.filter(r => {
    if (!r.check_in) return false;
    const recordDate = new Date(r.check_in).toISOString().split("T")[0];
    return recordDate === date;
  });

  filtered.sort((a, b) => new Date(a.check_in) - new Date(b.check_in)); // ترتيب بالتشيك إن

  filtered.forEach(record => {
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
        const span = document.createElement("span");
        span.textContent = formatDateCairo(field);
        td.appendChild(span);
        td.contentEditable = false;
      } else if (index === 3 && !field) {
        const btn = document.createElement("button");
        btn.textContent = "🕓";
        btn.title = "Add Check Out Time";
        btn.onclick = () => openTimePickerPopup(record.id);
        td.appendChild(btn);
        td.contentEditable = false;
      } else {
        td.textContent = field || "";
        td.contentEditable = true;
      }

      td.addEventListener("blur", async () => {
  const newEmployee = row.cells[0].textContent.trim();
  const newCheckIn = row.cells[1].textContent.trim();
  const newCheckInLocation = row.cells[2].textContent.trim();
  const newCheckOut = row.cells[3].textContent.trim();
  const newCheckOutLocation = row.cells[4].textContent.trim();

  await updateRecord(record.id, newEmployee, newCheckIn, newCheckOut, newCheckInLocation, newCheckOutLocation);

  // ✅ أعد تحميل اليوم الحالي بعد التعديل
  renderAdminTableForDay(currentDayIndex);
});


      row.appendChild(td);
    });


// === زرار التعديل وزرار الحذف ===

    // زرار التعديل ✏️
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.title = "Edit Check In/Out";
    editBtn.onclick = () => openEditPopup(record);
    deleteTd.appendChild(editBtn);


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

  renderPaginationControls();
}

function renderPaginationControls() {
  let paginationContainer = document.getElementById("paginationControls");

  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "paginationControls";
    paginationContainer.style.marginTop = "20px";
    paginationContainer.style.textAlign = "center";
    document.querySelector(".table-container").appendChild(paginationContainer);
  }

  paginationContainer.innerHTML = uniqueDates.map((d, i) => {
    const style = i === currentDayIndex ? "font-weight:bold; color:#e67e22;" : "cursor:pointer;";
    return `<span style="${style}" onclick="changeDay(${i})">${i + 1}</span>`;
  }).join(" | ");
}

function changeDay(index) {
  currentDayIndex = index;
  renderAdminTableForDay(currentDayIndex);
}


function toggleActiveCheckins() {
  const onlyActive = document.getElementById("onlyActiveCheckins").checked;

  if (!onlyActive) {
    renderAdminTableForDay(currentDayIndex);
    return;
  }

  const tbody = document.querySelector("#attendanceTable tbody");
  tbody.innerHTML = "";

  const activeRecords = allAttendanceRecords.filter(r => {
    return r.check_in && !r.check_out;
  });

  // ✅ ترتيب حسب location ثم check_in
  activeRecords.sort((a, b) => {
    const locA = a.check_in_location || "";
    const locB = b.check_in_location || "";
    if (locA < locB) return -1;
    if (locA > locB) return 1;
    return new Date(a.check_in) - new Date(b.check_in);
  });

  activeRecords.forEach(record => {
    const row = document.createElement("tr");

    [
      record.employee_name,
      record.check_in,
      record.check_in_location,
      "-", // Check Out is empty
      "-"  // Check Out Location is empty
    ].forEach((field, index) => {
      const td = document.createElement("td");
      if (index === 1 && record.check_in) {
        td.textContent = formatDateCairo(record.check_in);
      } else {
        td.textContent = field;
      }
      row.appendChild(td);
    });

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

  // نخفي الباجيناشن لو في الفلترة
  const pagination = document.getElementById("paginationControls");
  if (pagination) pagination.style.display = "none";
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
  const maxDistance = 30; // مسافة السماح (متر)

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
    return;
  }

  // ✅ طلب تحديد الموقع بدقة + مهلة + بدون كاش
  navigator.geolocation.getCurrentPosition(async position => {
    const result = isWithinRange(position);
    const maxDistance = 30; // ✨ الحد الأقصى المقبول للمسافة

    if (result) {
      const { branchName, distance } = result;

      if (distance <= maxDistance) {
        const { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('employee_name', currentUser.fullname)
          .is('check_out', null);

        if (error) {
          alert("❌ Error checking previous records!");
          console.error(error);
          hideLoading();
          return;
        }

        if (data.length > 0) {
          alert("⚠️ يا معلم ما انت باصم حضور شغل مخك. لازم تعمل انصراف الاول");
          hideLoading();
          return;
        }

        await saveCheckIn(currentUser.fullname, branchName);
        alert(`✅ احلى حضور على عنيك ! انت ${distance} meters بعيد عن ${branchName}.`);
        loadEmployeeAttendance();
      } else {
        alert(`❌ انت ${distance} meters بعيد عن ${branchName}. اتحرك شوية و قرب من الفرع و اقفل النت و افتحه تاني عشان الـ GPS يعمل ريفريش`);
      }
    } else {
      alert("❌ Location detection failed.");
    }

    hideLoading();
  }, error => {
    alert("❌ ياعم ما تفتح اللوكيشن الأول متتعبناش معاك");
    hideLoading();
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  });
}


function checkOut() {
  showLoading(); // نظهر الـ Loading Indicator

  navigator.geolocation.getCurrentPosition(async position => {
    const result = isWithinRange(position);
    const maxDistance = 30;

    if (result) {
      const { branchName, distance } = result;

      if (distance <= maxDistance) {
        const { data, error } = await supabase
          .from('attendance')
          .select('*')
          .eq('employee_name', currentUser.fullname)
          .is('check_out', null)
          .order('check_in', { ascending: true }); // خد أقدم Check In مفتوح

        if (error) {
          alert("❌ Error checking previous records!");
          console.error(error);
          hideLoading();
          return;
        }

        if (data.length === 0) {
          alert("⚠️ طيب بعقلك كده ينفع حد يعمل انصراف من غير ما يعمل حضور ؟ ما انت مبصمتش حضووووور!");
          hideLoading();
          return;
        }

        const openRecord = data[0];

        const { error: checkoutError } = await supabase
          .rpc('set_checkout_time', {
            emp_name: currentUser.fullname,
            loc_name: branchName
          });

        if (checkoutError) {
          console.error('❌ Error during Check Out RPC:', checkoutError);
          alert('❌ Failed to Check Out.');
          hideLoading();
          return;
        }

        alert(`✅ احلى انصراف على عنيك ! انت ${distance} meters بعيد ${branchName}.`);
        loadEmployeeAttendance();

      } else {
        alert(`❌ انت ${distance} meters بعيد عن ${branchName}. اتحرك شوية و قرب من الفرع و اقفل النت و افتحه تاني عشان الـ GPS يعمل ريفريش`);
      }

    } else {
      alert("❌ ياعم ما تفتح اللوكيشن الأول متتعبناش معاك");
    }

    hideLoading();
  }, error => {
    alert("❌ ياعم ما تفتح اللوكيشن الأول متتعبناش معاك");
    hideLoading();
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
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

function formatDateServer(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const hh = String(date.getUTCHours()).padStart(2, '0');
  const mi = String(date.getUTCMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
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

  // 👇 تغيير عنوان الأعمدة للتوضيح إنه بتوقيت القاهرة
  let csvContent = "Employee,Check In (Cairo),Check In Location,Check Out (Cairo),Check Out Location\n";

  filtered.forEach(record => {
    const employee = record.employee_name || "";
    const checkIn = record.check_in ? `="${formatDateCairo(record.check_in)}"` : "";
    const checkInLoc = record.check_in_location || "";
    const checkOut = record.check_out ? `="${formatDateCairo(record.check_out)}"` : "";
    const checkOutLoc = record.check_out_location || "";

    csvContent += `"${employee}",${checkIn},"${checkInLoc}",${checkOut},"${checkOutLoc}"\n`;
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

    // Employee
    const employeeCell = document.createElement("td");
    employeeCell.textContent = record.employee_name || "";
    row.appendChild(employeeCell);

    // Check In
    const checkInCell = document.createElement("td");
    checkInCell.textContent = formatDateCairo(record.check_in);
    row.appendChild(checkInCell);

    // Check In Location
    const checkInLocationCell = document.createElement("td");
    checkInLocationCell.textContent = record.check_in_location || "";
    row.appendChild(checkInLocationCell);

    // Check Out
    const checkOutCell = document.createElement("td");
    checkOutCell.textContent = formatDateCairo(record.check_out);
    row.appendChild(checkOutCell);

    // Check Out Location
    const checkOutLocationCell = document.createElement("td");
    checkOutLocationCell.textContent = record.check_out_location || "";
    row.appendChild(checkOutLocationCell);

    // Actions
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
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

    const checkIn = checkInDate.value && checkInTime.value
      ? new Date(`${checkInDate.value}T${checkInTime.value}:00+03:00`).toISOString()
      : null;

    const checkOut = (checkOutDate.value && checkOutTime.value)
      ? new Date(`${checkOutDate.value}T${checkOutTime.value}:00+03:00`).toISOString()
      : null;

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


async function fetchPayslip() {
  const fullname = currentUser?.fullname;
  if (!fullname) return alert("❌ لا يوجد اسم موظف");

  const url = "https://inmklarxbvafddjllyga.supabase.co/functions/v1/payroll_refresh";

  try {
    const response = await fetch(url);
    const json = await response.json();

    const matched = json.result.find(p => p.employee_id?.[1] === fullname && p.x_studio_monthly_report);

    if (!matched) {
      alert("❌ لا يوجد تقرير مرتب لك حتى الآن");
      return;
    }

    const htmlContent = matched.x_studio_monthly_report;

    // عرض مباشر
    const container = document.getElementById("payslipContent");
    container.innerHTML = htmlContent;
    container.style.display = "block";

    // تحميل كـ PDF تلقائيًا
    html2pdf().from(htmlContent).save(`${fullname}_Payslip.pdf`);
  } catch (error) {
    console.error("❌ Error fetching payslip:", error);
    alert("❌ فشل في تحميل تقرير المرتب");
  }
}

// زرار الأدمن لعرض المرتبات
document.getElementById('show-payroll-summary').onclick = showPayrollModal;

function showPayrollModal() {
  document.getElementById('payroll-modal').style.display = "block";
  document.body.style.overflow = "hidden";
  renderPayrollTable();
}
function closePayrollModal() {
  document.getElementById('payroll-modal').style.display = "none";
  document.body.style.overflow = "";
  document.getElementById('payroll-table-container').innerHTML = "";
}



// نفس كود ملخص المرتبات، كله جوة المودال
function renderPayrollTable() {
  const container = document.getElementById('payroll-table-container');
  container.innerHTML = `<div style="text-align:center;font-size:19px;">⏳ جاري التحميل...</div>`;
  fetch('https://inmklarxbvafddjllyga.supabase.co/functions/v1/payroll_refresh')
    .then(res => res.json())
    .then(json => {
      const payslips = (json.result && Array.isArray(json.result)) ? json.result : (json.result?.result || []);
      if (!payslips.length) {
        container.innerHTML = "<p style='color:red;'>🚫 لا يوجد بيانات.</p>";
        return;
      }

      // Search & Dropdown
      let employeeOptions = payslips.map((p, idx) => ({
        name: Array.isArray(p.employee_id) ? p.employee_id[1] : p.employee_id,
        rowIdx: idx
      }));

      let controls = `
      <div style="text-align:center; margin-bottom:28px;">
        <input type="text" id="payroll-employee-search" placeholder="🔍 ابحث عن موظف..." style="width:220px; padding:8px; border-radius:8px; font-size:17px; border:1px solid #ccc; margin-left:6px;" oninput="payrollFilterDropdown()">
        <select id="payroll-employee-dropdown" style="width:210px; padding:8px; border-radius:8px; font-size:17px; border:1px solid #ccc;" onchange="payrollScrollToEmployee()">
          <option value="">اختر موظف...</option>
          ${employeeOptions.map(opt=>`<option value="${opt.rowIdx}">${opt.name}</option>`).join('')}
        </select>
      </div>
      `;

      let table = `<table id="payroll-table" style="margin-bottom:50px;">
        <tr>
          <th>اسم الموظف</th>
          <th>المرتب الأساسي</th>
          <th>عدد أيام الإجازة</th>
          <th>فرق ساعات العمل</th>
          <th>صافي المرتب</th>
          <th>الحوافز</th>
          <th>الخصومات</th>
          <th>التأخيرات</th>
        </tr>`;

      payslips.forEach((p, idx) => {
        let employeeName = Array.isArray(p.employee_id) ? p.employee_id[1] : p.employee_id;
        let salary = extractTableValue(p.x_studio_monthly_report, "المرتب الأساسي");
        let vacationDays = extractTableValue(p.x_studio_monthly_report, "عدد أيام الإجازة");
        let hourDiff = extractTableValue(p.x_studio_monthly_report, "فرق ساعات العمل");
        let netSalary = extractNetSalary(p.x_studio_monthly_report);

        let rewardsTable    = extractSubTable(p.x_studio_monthly_report, "الحوافز");
        let deductionsTable = extractSubTable(p.x_studio_monthly_report, "الخصومات");
        let delaysTable     = extractDelayTable(p.x_studio_monthly_report);

        table += `
          <tr id="payroll-employee-row-${idx}">
            <td>${employeeName || '-'}</td>
            <td>${salary || '-'}</td>
            <td>${vacationDays || '-'}</td>
            <td>${hourDiff || '-'}</td>
            <td>${netSalary || '-'}</td>
            <td class="details">${rewardsTable || '-'}</td>
            <td class="details">${deductionsTable || '-'}</td>
            <td class="details">${delaysTable || '-'}</td>
          </tr>`;
      });

      table += '</table>';
      container.innerHTML = controls + table;
    });
}

// فلترة وهايلايت للموظفين جوا المودال
window.payrollFilterDropdown = function() {
  let val = document.getElementById('payroll-employee-search').value.trim();
  let payslips = (window.payslipsCacheModal || []);
  let employeeOptions = [];
  if (payslips.length) {
    employeeOptions = payslips.map((p, idx) => ({
      name: Array.isArray(p.employee_id) ? p.employee_id[1] : p.employee_id,
      rowIdx: idx
    }));
  } else {
    // Get from select options if cache is not ready
    let options = Array.from(document.getElementById('payroll-employee-dropdown').options).slice(1);
    employeeOptions = options.map(opt => ({name: opt.text, rowIdx: opt.value}));
  }
  let filtered = val ? employeeOptions.filter(opt => opt.name.toLowerCase().includes(val.toLowerCase())) : employeeOptions;
  document.getElementById('payroll-employee-dropdown').innerHTML = `<option value="">اختر موظف...</option>` + 
    filtered.map(opt=>`<option value="${opt.rowIdx}">${opt.name}</option>`).join('');
};

window.payrollScrollToEmployee = function() {
  let idx = document.getElementById('payroll-employee-dropdown').value;
  if (idx === "" || isNaN(idx)) return;
  let row = document.getElementById(`payroll-employee-row-${idx}`);
  if (row) {
    // سكرول حقيقي جوا الكونتينر نفسه
    let container = document.getElementById('payroll-table-container');
    container.scrollTo({
      top: row.offsetTop - 100, // ينزله شوية تحت الهيدر
      behavior: "smooth"
    });
    document.querySelectorAll('#payroll-table .highlight-row').forEach(el => el.classList.remove('highlight-row'));
    row.classList.add('highlight-row');
  }
};

// اعتمد نفس دوال الاستخراج من الجدول (ممكن تحطهم فوق أو تحت الكود)
function extractTableValue(html, label) {
  if (!html) return '';
  let doc = document.createElement('div');
  doc.innerHTML = html;
  let tds = Array.from(doc.querySelectorAll('td'));
  for (let i = 0; i < tds.length; i++) {
    if (tds[i].innerText.trim().replace(/[\n\r]+/g, '').includes(label)) {
      return tds[i + 1] ? tds[i + 1].innerText.trim() : '';
    }
  }
  return '';
}
function extractNetSalary(html) {
  if (!html) return '';
  let doc = document.createElement('div');
  doc.innerHTML = html;
  let tables = Array.from(doc.querySelectorAll('table'));
  for (let t of tables) {
    if (t.innerText.includes('صافي المرتب')) {
      let tds = t.querySelectorAll('td');
      for (let td of tds) {
        if (td.innerText.includes('جنيه') || td.innerText.includes('EGP') || /^\d+/.test(td.innerText)) {
          return td.innerText.trim();
        }
      }
    }
  }
  return '';
}
function extractSubTable(html, tableTitle) {
  if (!html) return '';
  let doc = document.createElement('div');
  doc.innerHTML = html;
  let tables = Array.from(doc.querySelectorAll('table'));
  for (let t of tables) {
    let th = t.querySelector('th');
    if (th && th.innerText.includes(tableTitle)) {
      t.classList.add('mini-table');
      return t.outerHTML;
    }
  }
  return '';
}
function extractDelayTable(html) {
  if (!html) return '';
  let doc = document.createElement('div');
  doc.innerHTML = html;
  let tables = Array.from(doc.querySelectorAll('table'));
  for (let t of tables) {
    if (t.innerText.includes('تأخير من') || t.innerText.includes('خصم التأخيرات')) {
      t.classList.add('mini-table');
      return t.outerHTML;
    }
  }
  return '';
}

function openEditPopup(record) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.4)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";

  const popup = document.createElement("div");
  popup.style.background = "#fff";
  popup.style.padding = "22px";
  popup.style.borderRadius = "10px";
  popup.style.boxShadow = "0 0 16px #0002";
  popup.style.minWidth = "340px";
  popup.innerHTML = `
    <h3 style="margin-top:0;">🛠️ Edit Check In / Out</h3>
    <label>Check In: <input type="datetime-local" id="editCheckIn"></label><br><br>
    <label>Check Out: <input type="datetime-local" id="editCheckOut"></label><br><br>
    <button id="editSaveBtn">💾 Save</button>
    <button id="editCancelBtn">❌ Cancel</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Prefill data
  document.getElementById("editCheckIn").value = record.check_in
    ? new Date(record.check_in).toISOString().slice(0, 16)
    : "";
  document.getElementById("editCheckOut").value = record.check_out
    ? new Date(record.check_out).toISOString().slice(0, 16)
    : "";

  document.getElementById("editCancelBtn").onclick = () => {
    document.body.removeChild(overlay);
  };

  document.getElementById("editSaveBtn").onclick = async () => {
    const checkInVal = document.getElementById("editCheckIn").value;
    const checkOutVal = document.getElementById("editCheckOut").value;

    // بنحط القيمة الجديدة (أو null لو فاضي)
    const newCheckIn = checkInVal ? new Date(checkInVal).toISOString() : null;
    const newCheckOut = checkOutVal ? new Date(checkOutVal).toISOString() : null;

    await updateRecord(record.id, null, newCheckIn, newCheckOut, null, null);
    loadAdminData();
    document.body.removeChild(overlay);
  };
}
