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
import { connect } from 'react-redux'; // Import connect
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store'; // Import your root state type
import { CreateCustomerThunk,FindAllCustomersThunk } from '../store/Thunk/CustomerThunk';
import { FormValidator } from '@syncfusion/ej2-inputs';
import "../styles/Calendar.css";

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

interface CalendarState {
  localData: EventSettingsModel;
  attendanceStatus: string;
}

interface CalendarProps {
  dispatch: any;
}

class Calendar extends Component<CalendarProps, CalendarState> {
  // Declare the scheduleObj property with the correct type
  // Declare the scheduleObj property with the correct type
  private scheduleObj: ScheduleComponent | null = null;


  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      localData: {
        dataSource: [
        ],
        fields: {
          id: 'Id',
          subject: { name: 'PatientName', title: 'Hasta İsmi' },
          location: { name: 'PhoneNumber', title: 'Telefon Numarası' },
          startTime: { name: 'StartTime', title: 'Başlama Zamanı' },
          endTime: { name: 'EndTime', title: 'Bitiş Zamanı' },
          description: { name: 'Job', title: 'Yapılacak İşlem' },
          isAllDay: { name: 'attendanceStatus', title: 'Gelme Durumu' }
        }
      },
      attendanceStatus: 'Gelmedi'
    };
  }

  async componentDidMount() {
    const customers = await this.props.dispatch(FindAllCustomersThunk());

    console.log("customers=",customers);
    this.setState({
      localData: {
        ...this.state.localData,
        dataSource: customers.payload.map((customer: any) => ({
          Id: customer.id,
          PatientName: customer.customer_name,
          StartTime: new Date(customer.appointment_start_date),
          SpecialistId: customer.specialist_id,
          EndTime: new Date(customer.appointment_end_date),
          PhoneNumber: customer.phone_number,
          Job: customer.job,
          attendanceStatus: false
        }))
      }
    });
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
      { text: 'Gizem Filiz', id: 4, Color: "red" },
      { text: 'Nazan Dalkılıç', id: 5, Color: "grey" }
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

      const savedData = {
        customer_name: data[0].PatientName,
        phone_number: data[0].PhoneNumber,
        specialist_id: data[0].SpecialistId,
        appointment_start_date: new Date(data[0].StartTime).toISOString(), // Date format
        appointment_end_date: new Date(data[0].EndTime).toISOString(), // Date format
        job: data[0].Job,
        status: data.attendanceStatus === "Gelmedi" ? false : true // Boolean conversion
      };

      // Updated line
      this.props.dispatch(CreateCustomerThunk(savedData) as any);

      this.setState({ attendanceStatus: data.attendanceStatus });
    }
  }

  private eventTemplate = (props: any): string => {
    return `
      <div class="e-appointment-details">
        <div class="e-subject">${props.PatientName}</div>
        <div class="e-location">${props.PhoneNumber}</div>
        <div class="e-description">${props.Job}</div>
        <div class="e-status">${props.attendanceStatus}</div>
      </div>
    `;
  };

  render() {
    return (
      <ScheduleComponent
        ref={(schedule: ScheduleComponent | null) => this.scheduleObj = schedule}
        currentView='Day'
        eventSettings={this.state.localData}
        timeScale={this.timeScale}
        workHours={{ start: '08:00', end: '20:30', highlight: true }}
        startHour='08:00'
        endHour='20:30'
        group={this.group}
        resources={this.resources}
        actionBegin={this.onActionBegin}
        popupOpen={this.onPopupOpen}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>


    );
  }
}

// Connect Calendar to Redux
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, any>) => ({
  dispatch
});

export default connect(null, mapDispatchToProps)(Calendar);