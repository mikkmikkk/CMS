// Chart colors
export const chartColors = {
    backgroundColor: [
      'rgba(239, 68, 68, 0.4)',
      'rgba(59, 130, 246, 0.4)',
      'rgba(16, 185, 129, 0.4)',
      'rgba(245, 158, 11, 0.4)',
      'rgba(139, 92, 246, 0.4)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(75, 85, 99, 0.4)',
      'rgba(251, 146, 60, 0.4)',
      'rgba(52, 211, 153, 0.4)',
      'rgba(99, 102, 241, 0.4)',
      'rgba(209, 213, 219, 0.4)',
    ],
    borderColor: [
      'rgb(239, 68, 68)',
      'rgb(59, 130, 246)',
      'rgb(16, 185, 129)',
      'rgb(245, 158, 11)',
      'rgb(139, 92, 246)',
      'rgb(236, 72, 153)',
      'rgb(75, 85, 99)',
      'rgb(251, 146, 60)',
      'rgb(52, 211, 153)',
      'rgb(99, 102, 241)',
      'rgb(209, 213, 219)',
    ]
  };
  
  // Helper function to determine department from course code
  export const getDepartmentFromCourse = (courseCode) => {
    // Extract the program/degree code from the course code
    // This assumes the course code starts with the program abbreviation
    const programCode = courseCode.split(' ')[0]; // Get first part before any spaces
    
    // Map program codes to their respective colleges
    const collegeMap = {
      // College of Accounting and Business Education (CABE)
      'BSA': 'College of Accounting and Business Education',
      'BSMA': 'College of Accounting and Business Education', // Management Accounting
      'BSAIS': 'College of Accounting and Business Education', // Accounting Information System
      'BSBA': 'College of Accounting and Business Education', // Business Administration
      'BSREM': 'College of Accounting and Business Education', // Real Estate Management
      
      // College of Arts and Humanities (CAH)
      'AB': 'College of Arts and Humanities',
      'ABCOM': 'College of Arts and Humanities', // Communication
      'ABELS': 'College of Arts and Humanities', // English Language Studies
      'ABPhilo': 'College of Arts and Humanities', // Philosophy
      'ABPsych': 'College of Arts and Humanities', // Psychology
      
      // College of Computer Studies (CCS)
      'BSCS': 'College of Computer Studies',
      'BSIS': 'College of Computer Studies', // Information Systems
      'BSIT': 'College of Computer Studies', // Information Technology
      
      // College of Engineering and Architecture (CEA)
      'BSArch': 'College of Engineering and Architecture', // Architecture
      'BSCE': 'College of Engineering and Architecture', // Civil Engineering
      'BSCpE': 'College of Engineering and Architecture', // Computer Engineering
      'BSECE': 'College of Engineering and Architecture', // Electronics Engineering
      
      // College of Human Environmental Sciences and Food Studies (CHESFS)
      'BSND': 'College of Human Environmental Sciences and Food Studies', // Nutrition and Dietetics
      'BSHRM': 'College of Human Environmental Sciences and Food Studies', // Hotel Restaurant Management
      'BSTM': 'College of Human Environmental Sciences and Food Studies', // Tourism Management
      
      // College of Medical and Biological Science (CMBS)
      'BSBio': 'College of Medical and Biological Science', // Biology
      'BSMLS': 'College of Medical and Biological Science', // Medical Laboratory Science
      
      // College of Music (CM)
      'BM': 'College of Music',
      
      // College of Nursing (CN)
      'BSN': 'College of Nursing', // Nursing
      
      // College of Pharmacy and Chemistry (CPC)
      'BSP': 'College of Pharmacy and Chemistry', // Pharmacy
      'BSChem': 'College of Pharmacy and Chemistry', // Chemistry
      
      // College of Teacher Education (CTE)
      'BECE': 'College of Teacher Education', // Early Childhood Education
      'BEEd': 'College of Teacher Education', // Elementary Education
      'BSEd': 'College of Teacher Education', // Secondary Education
      'BSNE': 'College of Teacher Education', // Special Needs Education
      'BPE': 'College of Teacher Education', // Physical Education
    };
  
    // Check for exact matches first
    if (collegeMap[programCode]) {
      return collegeMap[programCode];
    }
    
    // For codes that might be variations or not exact matches
    // Check if the course code starts with any of the keys in the collegeMap
    for (const prefix in collegeMap) {
      if (programCode.startsWith(prefix)) {
        return collegeMap[prefix];
      }
    }
  
    // Additional pattern matching for special cases
    if (programCode.includes('BA') || programCode.includes('Acct') || programCode.includes('Fin') || 
        programCode.includes('Mgt') || programCode.includes('HRM')) {
      return 'College of Accounting and Business Education';
    } else if (programCode.includes('Arch') || programCode.includes('CE') || 
               programCode.includes('CpE') || programCode.includes('ECE')) {
      return 'College of Engineering and Architecture';
    } else if (programCode.includes('Ed') || programCode.includes('Edu') || programCode.includes('Teach')) {
      return 'College of Teacher Education';
    } else if (programCode.includes('CS') || programCode.includes('IS') || programCode.includes('IT')) {
      return 'College of Computer Studies';
    } else if (programCode.includes('Nurs')) {
      return 'College of Nursing';
    } else if (programCode.includes('Pharm') || programCode.includes('Chem')) {
      return 'College of Pharmacy and Chemistry';
    } else if (programCode.includes('Bio') || programCode.includes('MLS') || programCode.includes('Lab')) {
      return 'College of Medical and Biological Science';
    } else if (programCode.includes('ND') || programCode.includes('HRM') || programCode.includes('TM')) {
      return 'College of Human Environmental Sciences and Food Studies';
    } else if (programCode.includes('AB') || programCode.includes('Arts') || 
               programCode.includes('Com') || programCode.includes('Psych') || 
               programCode.includes('Phil')) {
      return 'College of Arts and Humanities';
    } else if (programCode.includes('Mus') || programCode.includes('BM')) {
      return 'College of Music';
    }
  
    return 'Unknown College'; // Default if no match is found
  };
  
  // Filter forms by timeframe
  export const filterFormsByTimeframe = (forms, timeframe) => {
    const now = new Date();
    let startDate;
    
    switch (timeframe) {
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        return forms.filter(form => {
          const formDate = form.submissionDate ? new Date(form.submissionDate) : null;
          return formDate && formDate >= startDate && formDate <= endDate;
        });
      case 'past3Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case 'allTime':
        return forms; // Return all forms without date filtering
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    
    return forms.filter(form => {
      const formDate = form.submissionDate ? new Date(form.submissionDate) : null;
      return formDate && formDate >= startDate;
    });
  };
  
  // Filter forms by college
  export const filterFormsByCollege = (forms, college, getDepartmentFromCourse) => {
    if (college === 'all') return forms;
    
    // Map college values to the full college names
    const collegeFullNameMap = {
      'cah': 'College of Arts and Humanities',
      'cmbs': 'College of Medical and Biological Science',
      'ccs': 'College of Computer Studies',
      'cabe': 'College of Accounting and Business Education',
      'cea': 'College of Engineering and Architecture',
      'chesfs': 'College of Human Environmental Sciences and Food Studies',
      'cm': 'College of Music',
      'cn': 'College of Nursing',
      'cpc': 'College of Pharmacy and Chemistry',
      'cte': 'College of Teacher Education'
    };
    
    const fullCollegeName = collegeFullNameMap[college];
    if (!fullCollegeName) return forms;
    
    return forms.filter(form => {
      const courseYearSection = form.courseYearSection || '';
      // Use the getDepartmentFromCourse function to determine the college
      const collegeName = getDepartmentFromCourse(courseYearSection);
      return collegeName === fullCollegeName;
    });
  };
  
  // Process chart data
  export const processChartData = (
    forms,
    getDepartmentFromCourse,
    setStudentsPerCollegeData,
    setSessionTypesData,
    setCounselingSessionsData,
    setYearPerCollegesData,
    setRemarksDistributionData,
    setChartOptions
  ) => {
    // Process Students per College (Pie Chart)
    const collegeCountMap = {
      'College of Arts and Humanities': 0,
      'College of Medical and Biological Science': 0,
      'College of Computer Studies': 0,
      'College of Accounting and Business Education': 0,
      'College of Engineering and Architecture': 0,
      'College of Human Environmental Sciences and Food Studies': 0,
      'College of Music': 0,
      'College of Nursing': 0,
      'College of Pharmacy and Chemistry': 0,
      'College of Teacher Education': 0,
      'Unknown College': 0
    };
    
    // Process Session Types (Bar Chart)
    const sessionTypeMap = {
      'Referral': 0,
      'Walk-in': 0
    };
    
    // Process Counseling Sessions Over Time (Line Chart)
    const sessionsOverTime = {};
    
    // Process Year per Colleges (Bar Chart)
    const yearCountMap = {
      '1st Year': 0,
      '2nd Year': 0,
      '3rd Year': 0,
      '4th Year': 0,
      'Other': 0
    };
    
    // Process Remarks Distribution (Pie Chart) - New
    const remarksMap = {
      'Attended': 0,
      'No Show': 0,
      'No Response': 0,
      'Terminated': 0,
      'Follow up': 0,
      'None': 0
    };
    
    forms.forEach(form => {
      // Process college data using getDepartmentFromCourse
      const courseYearSection = form.courseYearSection || '';
      const collegeName = getDepartmentFromCourse(courseYearSection);
      
      if (collegeCountMap.hasOwnProperty(collegeName)) {
        collegeCountMap[collegeName]++;
      } else {
        collegeCountMap['Unknown College']++;
      }
      
      // Process session type
      if (form.isReferral === true) {
        sessionTypeMap['Referral']++;
      } else {
        sessionTypeMap['Walk-in']++;
      }
      
      // Process date for time series
      if (form.submissionDate) {
        const date = new Date(form.submissionDate);
        const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
        if (!sessionsOverTime[dateStr]) {
          sessionsOverTime[dateStr] = 0;
        }
        sessionsOverTime[dateStr]++;
      }
      
      // Process year level
      const yearMatch = courseYearSection.match(/(\d)(?=\d*[A-Za-z])/);
      if (yearMatch) {
        const year = yearMatch[0];
        switch(year) {
          case '1': yearCountMap['1st Year']++; break;
          case '2': yearCountMap['2nd Year']++; break;
          case '3': yearCountMap['3rd Year']++; break;
          case '4': yearCountMap['4th Year']++; break;
          default: yearCountMap['Other']++;
        }
      } else {
        yearCountMap['Other']++;
      }
      
      // Process remarks (new)
      if (form.remarks) {
        if (remarksMap.hasOwnProperty(form.remarks)) {
          remarksMap[form.remarks]++;
        } else {
          remarksMap['None']++;
        }
      } else {
        remarksMap['None']++;
      }
    });
    
    // For the chart, use abbreviated names to fit better
    const collegeLabels = Object.keys(collegeCountMap).map(name => {
      if (name === 'Unknown College') return name;
      // Extract abbreviation from college name
      switch(name) {
        case 'College of Arts and Humanities': return 'CAH';
        case 'College of Medical and Biological Science': return 'CMBS';
        case 'College of Computer Studies': return 'CCS';
        case 'College of Accounting and Business Education': return 'CABE';
        case 'College of Engineering and Architecture': return 'CEA';
        case 'College of Human Environmental Sciences and Food Studies': return 'CHESFS';
        case 'College of Music': return 'CM';
        case 'College of Nursing': return 'CN';
        case 'College of Pharmacy and Chemistry': return 'CPC';
        case 'College of Teacher Education': return 'CTE';
        default: return name;
      }
    });
    
    // Prepare Students per College data
    setStudentsPerCollegeData({
      labels: collegeLabels,
      datasets: [
        {
          label: 'Students per College',
          data: Object.values(collegeCountMap),
          backgroundColor: chartColors.backgroundColor,
          borderColor: chartColors.borderColor,
          borderWidth: 1,
        },
      ],
    });
    
    // Prepare Session Types data
    setSessionTypesData({
      labels: Object.keys(sessionTypeMap),
      datasets: [
        {
          label: 'Session Types',
          data: Object.values(sessionTypeMap),
          backgroundColor: chartColors.backgroundColor.slice(0, 2),
          borderColor: chartColors.borderColor.slice(0, 2),
          borderWidth: 1,
        },
      ],
    });
    
    // Prepare Counseling Sessions Over Time data
    // Sort dates for the line chart
    const sortedDates = Object.keys(sessionsOverTime).sort();
    setCounselingSessionsData({
      labels: sortedDates,
      datasets: [
        {
          label: 'Counseling Sessions',
          data: sortedDates.map(date => sessionsOverTime[date]),
          fill: false,
          borderColor: 'rgb(239, 68, 68)',
          tension: 0.4,
        },
      ],
    });
    
    // Prepare Year per Colleges data
    setYearPerCollegesData({
      labels: Object.keys(yearCountMap),
      datasets: [
        {
          label: 'Students',
          data: Object.values(yearCountMap),
          backgroundColor: chartColors.backgroundColor,
          borderColor: chartColors.borderColor,
          borderWidth: 1,
        },
      ],
    });
    
    // Prepare Remarks Distribution data (new)
    setRemarksDistributionData({
      labels: Object.keys(remarksMap),
      datasets: [
        {
          label: 'Remarks Distribution',
          data: Object.values(remarksMap),
          backgroundColor: chartColors.backgroundColor,
          borderColor: chartColors.borderColor,
          borderWidth: 1,
        },
      ],
    });
    
    setChartOptions({
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'center',
          labels: {
            color: '#495057'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
              }
              return label;
            }
          }
        }
      },
      maintainAspectRatio: false
    });
  };
  
  // Calculate summary statistics
  export const calculateSummaryStatistics = (forms, getDepartmentFromCourse) => {
    // Total sessions
    const totalSessions = forms.length;
    
    // Total completed sessions (with status 'Completed')
    const totalCompletedSessions = forms.filter(form => form.status === 'Completed').length;
    
    // Average sessions per day
    const sessionsPerDay = {};
    forms.forEach(form => {
      if (form.submissionDate) {
        const date = new Date(form.submissionDate).toISOString().split('T')[0];
        sessionsPerDay[date] = (sessionsPerDay[date] || 0) + 1;
      }
    });
    
    const totalDays = Object.keys(sessionsPerDay).length || 1;
    const averageSessionsPerDay = (totalSessions / totalDays).toFixed(1);
    
    // Most/least active college
    const collegeCount = {
      'College of Arts and Humanities': 0,
      'College of Medical and Biological Science': 0,
      'College of Computer Studies': 0,
      'College of Accounting and Business Education': 0,
      'College of Engineering and Architecture': 0,
      'College of Human Environmental Sciences and Food Studies': 0,
      'College of Music': 0,
      'College of Nursing': 0,
      'College of Pharmacy and Chemistry': 0,
      'College of Teacher Education': 0,
      'Unknown College': 0
    };
    
    forms.forEach(form => {
      const courseYearSection = form.courseYearSection || '';
      const collegeName = getDepartmentFromCourse(courseYearSection);
      
      if (collegeCount.hasOwnProperty(collegeName)) {
        collegeCount[collegeName]++;
      } else {
        collegeCount['Unknown College']++;
      }
    });
    
    let mostActiveCollege = 'None';
    let leastActiveCollege = 'None';
    let maxCount = -1;
    let minCount = Infinity;
    
    Object.entries(collegeCount).forEach(([college, count]) => {
      // Convert full college names to abbreviations for display
      const getCollegeAbbr = (name) => {
        if (name === 'Unknown College') return name;
        switch(name) {
          case 'College of Arts and Humanities': return 'CAH';
          case 'College of Medical and Biological Science': return 'CMBS';
          case 'College of Computer Studies': return 'CCS';
          case 'College of Accounting and Business Education': return 'CABE';
          case 'College of Engineering and Architecture': return 'CEA';
          case 'College of Human Environmental Sciences and Food Studies': return 'CHESFS';
          case 'College of Music': return 'CM';
          case 'College of Nursing': return 'CN';
          case 'College of Pharmacy and Chemistry': return 'CPC';
          case 'College of Teacher Education': return 'CTE';
          default: return name;
        }
      };
      
      if (count > maxCount) {
        mostActiveCollege = getCollegeAbbr(college);
        maxCount = count;
      }
      
      if (count < minCount && count > 0) {
        leastActiveCollege = getCollegeAbbr(college);
        minCount = count;
      }
    });
    
    // Most common reason
    const reasonCount = {};
    forms.forEach(form => {
      let reason = 'Not specified';
      
      // Check both formats of concerns
      if (form.concerns) {
        if (form.concerns.academic && form.concerns.academic.length > 0) {
          reason = form.concerns.academic[0];
        } else if (form.concerns.personal && form.concerns.personal.length > 0) {
          reason = form.concerns.personal[0];
        }
      } else if (form.areasOfConcern) {
        const areas = form.areasOfConcern;
        if (areas.academic && areas.academic.length > 0) {
          reason = areas.academic[0];
        } else if (areas.personal && areas.personal.length > 0) {
          reason = areas.personal[0];
        } else if (areas.interpersonal && areas.interpersonal.length > 0) {
          reason = areas.interpersonal[0];
        } else if (areas.family && areas.family.length > 0) {
          reason = areas.family[0];
        }
      }
      
      reasonCount[reason] = (reasonCount[reason] || 0) + 1;
    });
    
    let mostCommonReason = 'None';
    let maxReasonCount = -1;
    
    Object.entries(reasonCount).forEach(([reason, count]) => {
      if (count > maxReasonCount) {
        mostCommonReason = reason;
        maxReasonCount = count;
      }
    });
    
    // Most common remark (new)
    const remarkCount = {};
    forms.forEach(form => {
      const remark = form.remarks || 'None';
      remarkCount[remark] = (remarkCount[remark] || 0) + 1;
    });
    
    let mostCommonRemark = 'None';
    let maxRemarkCount = -1;
    
    Object.entries(remarkCount).forEach(([remark, count]) => {
      if (count > maxRemarkCount && remark !== 'None') {
        mostCommonRemark = remark;
        maxRemarkCount = count;
      }
    });
    
    return {
      totalSessions,
      totalCompletedSessions,
      averageSessionsPerDay,
      mostActiveCollege,
      leastActiveCollege,
      mostCommonReason,
      mostCommonRemark
    };
  };
  
  // Get concerns text for CSV export
  export const getConcernText = (form) => {
    // Handle different formats of concerns
    if (form.concerns) {
      // Faculty referral format
      if (form.concerns.academic && form.concerns.academic.length > 0) {
        return form.concerns.academic.join(', ');
      }
      if (form.concerns.personal && form.concerns.personal.length > 0) {
        return form.concerns.personal.join(', ');
      }
    } else if (form.areasOfConcern) {
      // Student form format
      const areas = form.areasOfConcern;
      const concerns = [];
      
      if (areas.academic && areas.academic.length > 0) {
        concerns.push(...areas.academic);
      }
      if (areas.personal && areas.personal.length > 0) {
        concerns.push(...areas.personal);
      }
      if (areas.interpersonal && areas.interpersonal.length > 0) {
        concerns.push(...areas.interpersonal);
      }
      if (areas.family && areas.family.length > 0) {
        concerns.push(...areas.family);
      }
      
      return concerns.join(', ');
    }
    
    return "Not specified";
  };
  
  // Prepare CSV data for export
  export const prepareCSVData = (reportData) => {
    return reportData.map(form => ({
      'Student Name': form.studentName || 'N/A',
      'Course/Year/Section': form.courseYearSection || 'N/A',
      'Submission Date': form.submissionDate || 'N/A',
      'Session Type': form.isReferral ? 'Referral' : 'Walk-in',
      'Status': form.status || 'N/A',
      'Remarks': form.remarks || 'None',
      'Referrer': form.referredBy || form.facultyName || 'Self',
      'Concerns': getConcernText(form)
    }));
  };