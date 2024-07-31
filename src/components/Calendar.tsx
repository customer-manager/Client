import React, { Component } from 'react';
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  EventSettingsModel,
  ViewsModel,
  PopupOpenEventArgs,
  ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { registerLicense, L10n } from '@syncfusion/ej2-base';
import { FormValidator } from "@syncfusion/ej2-inputs";
import "../styles/Calendar.css";

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
      'Edit Event':'Kayıt güncelle',
      'saveButton': 'Kaydet',
      'cancelButton': 'İptal',
      'deleteButton': 'Sil',
      'repeat': 'Durum',
      'newEvent': 'Hasta Kayıt',
    },
  }
});

interface CalendarState {
  localData: EventSettingsModel;
  attendanceStatus: string;
}

class Calendar extends Component<{}, CalendarState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      localData: {
        dataSource: [
          {
            Id: 1,
            PatientName: 'Hasta 1',
            StartTime: new Date(2024, 6, 20, 9, 30),
            EndTime: new Date(2024, 6, 20, 10, 0),
            PhoneNumber: '1234567890',
            Job: 'Kemal Yılmaz',
            attendanceStatus: 'Gelmedi' // Initial status
          }
        ],
        fields: {
          id: 'Id',
          subject: { name: 'PatientName', title: 'Hasta İsmi' },
          location: { name: 'PhoneNumber', title: 'Telefon Numarası' },
          startTime: { name: 'StartTime', title: 'Başlama Zamanı' },
          endTime: { name: 'EndTime', title: 'Bitiş Zamanı' },
          description: { name: 'Job', title: 'Yapılacak İşlem' },
          isAllDay: { name: 'attendanceStatus', title: 'Gelme Durumu' } // Changed to attendanceStatus
        }
      },
      attendanceStatus: 'Gelmedi' // Initial status
    };
  }

  private views: ViewsModel[] = [
    { option: 'Day' }
  ];

  private timeScale: any = {
    interval: 30,
    slotCount: 1
  };

  private group: any = {
    resources: ['Specialists']
  };

  private resources: any = [{
    field: 'SpecialistId',
    title: 'Uzman',
    name: 'Specialists',
    allowMultiple: false,
    dataSource: [
      { text: 'Kemal Yılmaz', id: 1, Color: "blue" },
      { text: 'Şueda', id: 2, Color: "green" },
      { text: 'Ayşegül Kölr', id: 3, Color: "grey" },
      { text: 'Gizem Filiz', id: 4, Color: "purple" },
      { text: 'Nazan Dalkılıç', id: 5, Color: "red" }
    ],
    textField: 'text',
    idField: 'id'
  }];

  private radioButtonGenerator = (status: string) => {
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

  private onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === 'QuickInfo') {
      if (args.target && args.target.classList.contains('e-appointment')) {
        args.cancel = false;
      } else {
        args.cancel = true;
        if (this.scheduleObj && args.data) {
          this.scheduleObj.openEditor(args.data as Record<string, any>, 'Add');
        }
      }
    }

    if (args.type === 'Editor') {
      const repeatElement = args.element.querySelector('.e-input-wrapper.e-form-left');

      if (repeatElement) {
        const status = (args.data as any).attendanceStatus || 'Gelmedi'; // Fallback to 'Gelmedi'
        repeatElement.innerHTML = this.radioButtonGenerator(status);
      }

      const alldayCheckBox = args.element.querySelector(".e-all-day");
      const timeZoneCheckBox = args.element.querySelector(".e-time-zone");

      if (alldayCheckBox) {
        alldayCheckBox.id = "displayer";
      }

      if (timeZoneCheckBox) {
        timeZoneCheckBox.id = "displayer";
      }

      const formElement = args.element.querySelector('.e-schedule-form') as HTMLFormElement;
      if (formElement) {
        const validator = (formElement as any).ej2_instances?.[0] as FormValidator;
        if (validator) {
          validator.rules = {
            'PatientName': { required: true },
            'PhoneNumber': { required: true },
            'StartTime': { required: true },
            'EndTime': { required: true },
            'Job': { required: true },
            'attendanceStatus': { required: true }
          };
        }
      } else {
        console.error("Form element not found");
      }
    }
  }

  private onActionBegin = (args: ActionEventArgs): void => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      const data = args.data as Record<string, any>;
      
      const statusElement = document.querySelector('input[name="attendanceStatus"]:checked') as HTMLInputElement;
      if (statusElement) {
        data.attendanceStatus = statusElement.value;
      }

      console.log("Form Data:", data);

      this.setState({ attendanceStatus: data.attendanceStatus });
    }
  }

  private eventTemplate = (props: any): string => {
    return `
      <div className=''>
        <div><strong>Hasta İsmi: </strong>${props.PatientName}</div>
        <div>${props.Job}</div>
      </div>
    `;
  };

  private scheduleObj: ScheduleComponent | null = null;

  public render(): React.ReactNode {
    return (
      <div>
        <ScheduleComponent
          ref={schedule => this.scheduleObj = schedule}
          currentView='Day'
          eventSettings={this.state.localData}
          timeScale={this.timeScale}
          workHours={{ start: '08:00', end: '20:30' }}
          startHour='08:00'
          endHour='20:30'
          group={this.group}
          resources={this.resources}
          popupOpen={this.onPopupOpen}
          actionBegin={this.onActionBegin}
          eventRendered={(args) => {
            args.element.innerHTML = this.eventTemplate(args.data);
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </div>
    );
  }
}

export default Calendar;
