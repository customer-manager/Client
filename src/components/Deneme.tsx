import * as React from 'react';
import { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import {registerLicense,L10n} from "@syncfusion/ej2-base"
import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject, ViewsDirective, ViewDirective, ViewsModel } from '@syncfusion/ej2-react-schedule';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

// Register Syncfusion license and localization
const licenseKey = process.env.REACT_APP_SYNCFUSION_LICENSE || 'default_license_key';
registerLicense(licenseKey);

L10n.load({
    'en-US': {
      'schedule': {
        'day': 'Gün',
        'week': 'Hafta',
        'month': 'Ay',
        'workWeek': 'Haftaiçi',
        'sunday': 'Pazar',
        'monday': 'Pazartesi',
        'tuesday': 'Salı',
        'wednesday': 'Çarşamba',
        'thursday': 'Perşembe',
        'friday': 'Cuma',
        'saturday': 'Cumartesi',
        'title': 'Hasta İsmi',
        'location': 'Telefon Numarası',
        'Add Event': 'Yeni Hasta Kayıt',
        'Edit Event': 'Kayıt güncelle',
        'saveButton': 'Kaydet',
        'cancelButton': 'İptal',
        'deleteButton': 'Sil',
        'repeat': 'Durum',
        'newEvent': 'Hasta Kayıt',
      },
    }
  });

const Deneme = () => {
  const scheduleObj = useRef(null);
  const scheduleData = {
    dataSource:[{
        Id: 3,
        Subject: 'Testing',
        SpecialistId:2,
        location:'Alanya',
        StartTime: new Date(2024, 7, 7, 12, 0),
        EndTime: new Date(2024, 7, 7, 13, 0),
        IsAllDay: false
      }, {
        Id: 4,
        Subject: 'Vacation',
        location:"Ankara",
        StartTime: new Date(2024, 7, 8, 9, 0),
        EndTime: new Date(2024, 7, 8, 10, 0),
        IsAllDay: false
      }]
  }

  const views: ViewsModel[] = [
    { option: 'Day' }
  ];

  const timeScale: any = {
    interval: 30,
    slotCount: 1
  };

  const group: any = {
    resources: ['Specialists']
  };

  const resources: any = [{
    field: 'SpecialistId',
    title: 'Uzman',
    name: 'Specialists',
    allowMultiple: false,
    dataSource: [
      { text: 'Kemal Yılmaz', id: 1, Color: "blue" },
      { text: 'Şueda', id: 2, Color: "green" },
      { text: 'Ayşegül Kölr', id: 3, Color: "grey" },
      { text: 'Gizem Filiz', id: 4, Color: "red" },
      { text: 'Nazan Dalkılıç', id: 5, Color: "grey" }
    ],
    textField: 'text',
    idField: 'id'
  }];

  const radioButtonGenerator = (status:string) => {
    return `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="attendanceStatus" id="attendedCheck" value="Geldi" ${status === 'Geldi' ? 'checked' : ''}>
        <label class="form-check-label" for="attendedCheck">
          Geldi
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="attendanceStatus" id="notAttendedCheck" value="Gelmedi" ${status === 'Gelmedi' ? 'checked' : ''}>
        <label class="form-check-label" for="notAttendedCheck">
          Gelmedi
        </label>
      </div>
    `;
  };
  

  return (
    <div>
      <ScheduleComponent 
      ref={scheduleObj} 
      currentView='Day'
      resources={resources}
      group={group}
      width='100%' 
      height='550px' 
      startHour='8:30'
      endHour='21:00'
      eventSettings={scheduleData}>
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='WorkWeek' />
          <ViewDirective option='Month' />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  )
};

export default Deneme;