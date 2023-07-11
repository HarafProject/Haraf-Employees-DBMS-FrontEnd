import profile from "../../assets/profile2.png";

const attendance_reports = [
    {
        'id': 1,
        'supervisor_name': 'John Doe',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '09:00 AM',
        'present': 70,
        'absent': 10,
        'zone': 'Adamawa North',
        'location': 'AD North, Guyuk',
        'comment': 'Good attendance overall.',
        'beneficiary': [
            {
                "id": 1,
                "image": profile,
                "full_name": "musa",
                "attendance_status": "Present",
                "work_typology": "health",
                "ward": "banjiram",
                "ticked_by": '',
                "sp_action": [
                    {
                        "id": 1,
                        "status": 'present',
                        "time_tick": "9:40pm"
                    },
                ]
            },
            {
                "id": 2,
                "image": profile,
                "full_name": "Adamu",
                "attendance_status": "Present",
                "ticked_by": '',
                "ward": "chikila",
                "work_typology": "education",
                "sp_action": [
                    {
                        "id": 1,
                        "status": 'present',
                        "time_tick": "9:40pm"
                    },
                    {
                        "id": 2,
                        "status": 'absent',
                        "time_tick": "9:40pm"
                    },
                ]
            },
            {
                "id": 3,
                "image": profile,
                "full_name": "David",
                "ticked_by": '',
                "ward": "dukul",
                "attendance_status": "Absent",
                "work_typology": "wash",
                "sp_action": [
                    {
                        "id": 1,
                        "status": 'absent',
                        "time_tick": "9:40pm"
                    },
                    {
                        "id": 2,
                        "status": 'absent',
                        "time_tick": "9:40pm"
                    },
                    {
                        "id": 3,
                        "status": 'present',
                        "time_tick": "9:40pm"
                    },
                ]
            },
            {
                "id": 4,
                "image": profile,
                "full_name": "Joe Davis",
                "ticked_by": '',
                "ward": "dumna",
                "attendance_status": "Absent",
                "work_typology": "transport",
                "sp_action": [
                 
                    {
                        "id": 1,
                        "status": 'absent',
                        "time_tick": "9:40pm"
                    },
                ]
            },
            {
                "id": 5,
                "image": profile,
                "full_name": "Saratu",
                "ward": "guyuk",
                "attendance_status": "Present",
                "work_typology": "agriculture",
                "ticked_by": '',
                "sp_action": [
                    {
                        "id": 1,
                        "status": 'present',
                        "time_tick": "9:40pm"
                    },
                    {
                        "id": 2,
                        "status": 'present',
                        "time_tick": "9:40pm"
                    },
                ]
            }
        ]
    },
    {
        'id': 2,
        'supervisor_name': 'Jane Smith',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '09:15 AM',
        'present': 60,
        'absent': 20,
        'zone': 'Adamawa South',
        'location': 'AD South, Guyuk',
        'comment': 'Attendance could be better.',
        'beneficiary': [
            {
                "id": 1,
                "image": profile,
                "full_name": "musa",
                "attendance_status": "Present",
                "work_typology": "health",
                "ward": "banjiram",
                "ticked_by": '',
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 2,
                "image": profile,
                "full_name": "Adamu",
                "ticked_by": '',
                "ward": "chikila",
                "work_typology": "education",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'present',
                        "action3": 'absent',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 3,
                "image": profile,
                "full_name": "David",
                "ticked_by": '',
                "ward": "dukul",
                "work_typology": "wash",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'absent',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 4,
                "image": profile,
                "full_name": "Joe Davis",
                "ticked_by": '',
                "ward": "dumna",
                "work_typology": "transport",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'present',
                        "action3": 'absent',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 5,
                "image": profile,
                "full_name": "Saratu",
                "ward": "guyuk",
                "work_typology": "agriculture",
                "ticked_by": '',
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'present',
                        "action3": 'absent',
                        "action4": 'absent'
                    }
                ]
            },
        ]
    },
    {
        'id': 3,
        'supervisor_name': 'Michael Johnson',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '05:30 PM',
        'present': 55,
        'absent': 15,
        'zone': 'Adamawa South',
        'location': 'AD South, Guyuk',
        'comment': 'Some absences due to illness.',
        'beneficiary': []
    },
    {
        'id': 4,
        'supervisor_name': 'Emily Williams',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '09:45 AM',
        'present': 80,
        'absent': 5,
        'zone': 'Adamawa Central',
        'location': 'AD Central, Guyuk',
        'comment': 'Excellent attendance today.',
        'beneficiary': [
            {
                "id": 1,
                "image": profile,
                "full_name": "musa",
                "attendance_status": "Present",
                "work_typology": "health",
                "ward": "banjiram",
                "ticked_by": '',
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 2,
                "image": profile,
                "full_name": "Adamu",
                "ticked_by": '',
                "ward": "chikila",
                "work_typology": "education",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 3,
                "image": profile,
                "full_name": "David",
                "ticked_by": '',
                "ward": "dukul",
                "work_typology": "wash",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 4,
                "image": profile,
                "full_name": "Joe Davis",
                "ticked_by": '',
                "ward": "dumna",
                "work_typology": "transport",
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            },
            {
                "id": 5,
                "image": profile,
                "full_name": "Saratu",
                "ward": "guyuk",
                "work_typology": "agriculture",
                "ticked_by": '',
                "sp_action": [
                    {
                        "action1": 'present',
                        "action2": 'absent',
                        "action3": 'present',
                        "action4": 'present'
                    }
                ]
            }
        ]
    },
    {
        'id': 5,
        'supervisor_name': 'David Brown',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '10:00 AM',
        'present': 65,
        'absent': 10,
        'zone': 'Adamawa Central',
        'location': 'AD Central, Guyuk',
        'comment': 'A few latecomers.',
        'beneficiary': []
    },
    {
        'id': 6,
        'supervisor_name': 'Olivia Davis',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '04:40 PM',
        'present': 75,
        'absent': 5,
        'zone': 'Adamawa South',
        'location': 'AD South, Guyuk',
        'comment': 'Great turnout today.'
    },
    {
        'id': 7,
        'supervisor_name': 'James Wilson',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '10:30 AM',
        'present': 50,
        'absent': 20,
        'zone': 'Adamawa North',
        'location': 'AD North, Guyuk',
        'comment': 'Low attendance due to unforeseen circumstances.'
    },
    {
        'id': 8,
        'supervisor_name': 'Sophia Martinez',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '10:45 AM',
        'present': 70,
        'absent': 15,
        'zone': 'Adamawa North',
        'location': 'AD North, Guyuk',
        'comment': 'Attendance impacted by heavy rainfall.'
    },
    {
        'id': 9,
        'supervisor_name': 'Daniel Anderson',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '11:00 AM',
        'present': 55,
        'absent': 25,
        'zone': 'Adamawa North',
        'location': 'AD North, Guyuk',
        'comment': 'Multiple absentees without prior notice.'
    },
    {
        'id': 10,
        'supervisor_name': 'Ava Taylor',
        'role':'Supervisor',
        'phon_number': '0814444444',
        'date': '2023-07-09',
        'time_sent': '11:15 AM',
        'present': 60,
        'absent': 10,
        'zone': 'Adamawa Central',
        'location': 'AD Central, Guyuk',
        'comment': 'Overall, a satisfactory turnout.'
    }
]

export default attendance_reports;
