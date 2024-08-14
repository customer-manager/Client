import React, { Component } from 'react';
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  ViewsModel,
  PopupOpenEventArgs,
  ActionEventArgs
} from '@syncfusion/ej2-react-schedule';
import { registerLicense, L10n } from '@syncfusion/ej2-base';
import { connect } from 'react-redux'; 
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store/store';
import { CreateCustomerThunk,FindAllCustomersThunk ,DeleteCustomerThunk,UpdateCustomerThunk} from '../store/Thunk/CustomerThunk';
import { FormValidator } from '@syncfusion/ej2-inputs';
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
      'title': 'Müşteri İsmi',
      'location': 'Telefon Numarası',
      'Add Event': 'Yeni Müşteri Kayıt',
      'Edit Event': 'Kayıt güncelle',
      'Delete Event': 'Randevu iptal',
      'saveButton': 'Kaydet',
      'cancelButton': 'İptal',
      'deleteButton': 'Sil',
      'repeat': 'Durum',
      'newEvent': 'Müşteri Kayıt',
      'timeFormat': 'HH:mm',
      'dayOfWeek': ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
      'monthOfYear': ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
    },
  }
});

interface CalendarState {
  localData: any;
}

interface CalendarProps {
  dispatch: any;
}

class Calendar extends Component<CalendarProps, CalendarState> {
  private scheduleObj: ScheduleComponent | null = null;


  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      localData: {
        dataSource: [
        ],
        fields: {
          id: 'Id',
          subject: { name: 'PatientName', title: 'Müşteri İsmi' },
          location: { name: 'PhoneNumber', title: 'Telefon Numarası' },
          startTime: { name: 'StartTime', title: 'Başlama Zamanı' },
          endTime: { name: 'EndTime', title: 'Bitiş Zamanı' },
          description: { name: 'Job', title: 'Yapılacak İşlem' },
          status: { name: 'Status', title: 'Durum' } ,
          PaymentInput:{name:"PaymentInput",title:'Ödeme'}
        }
      }
    };
  }

  async componentDidMount() {
    if(localStorage.getItem("serviceToken")){
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
          status:customer.status,
          PaymentInput:customer.PaymentInput
        }))
      }
    });
    }
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

  private paymentElementGeneretor=(PaymentInput:any)=>{
    return `
    <label>Ödenecek tutar</label>
      <div class="e-PaymentInput-container">
        <div class="e-float-input e-control-wrapper e-input-group">
          <input 
            class="e-PaymentInput e-field" 
            type="text" 
            value=${PaymentInput ? PaymentInput : '0'}
            name="PaymentInput"
            id="PaymentInput" 
            aria-labelledby="label_Payment"
          >
        </div>
      </div>
    `
  }

  private onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === 'QuickInfo') {
      if (args.target && args.target.classList.contains('e-appointment')) {
        console.log("Commmmming data=",args.data);
        const status = (args.data as any).status==="Geldi" ? 'Geldi' : "Gelmedi";  
  
        // Find the resource element in the QuickInfo popup
        const resourceElement = args.element.querySelector('.e-resource');
        if (resourceElement) {
          // Update the existing status element
          resourceElement.innerHTML = `<div class="e-resource-icon e-icons"></div><div class="e-resource-details e-text-ellipsis">Gelme Durumu: ${status}</div>`;
        } else {
          console.error("Resource element not found in QuickInfo popup");
        }
      } else {
        args.cancel = true;
        if (this.scheduleObj && args.data) {
          this.scheduleObj.openEditor(args.data as Record<string, any>, 'Add');
        }
      }
    }
    if (args.type === 'Editor') {
      console.log("Editor init");
      
      // Var olan elementleri bulalım
      const repeatElement = args.element.querySelector('.e-input-wrapper.e-form-left');
      
      // Status radio butonlarını ekleyelim
      if (repeatElement) {
        const status = (args.data as any).status==="Geldi" ? 'Geldi' :'Gelmedi';
        repeatElement.innerHTML = this.radioButtonGenerator(status);
      }
      
      // Ödeme alanını eklemeden önce kontrol edelim
      if (!args.element.querySelector('.e-PaymentInput-container')) {
        const paymentElement = this.paymentElementGeneretor((args.data as any).PaymentInput);
        const paymentElementWrapper = document.createElement('div');
        paymentElementWrapper.innerHTML = paymentElement;
    
        const formElement = args.element.querySelector('.e-schedule-form') as HTMLFormElement;
        if (formElement) {
          formElement.appendChild(paymentElementWrapper);
        }
      }
    
      // Gerekli diğer elementleri bulalım ve gizleyelim
      const alldayCheckBox = args.element.querySelector(".e-all-day");
      const timeZoneCheckBox = args.element.querySelector(".e-time-zone");
      
      if (alldayCheckBox) {
        alldayCheckBox.id="displayer"
      }
    
      if (timeZoneCheckBox) {
        timeZoneCheckBox.id = "displayer";
      }
    
      // Form doğrulama işlemini gerçekleştirelim
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
            'attendanceStatus': { required: true },
            'PaymentInput':{required:true}
          };
        }
      } else {
        console.error("Form element not found");
      }
    }
  }
  
  

  private onActionBegin = (args: ActionEventArgs): void => {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      console.log("save or change");
      
      const data = args.data as Record<string, any>;

      console.log("original data=",data);
      
      if(args.requestType=="eventChange"){
        // Extract and update status
      const statusElement = document.querySelector('input[name="attendanceStatus"]:checked') as HTMLInputElement;

      if (statusElement) {
        data.status = statusElement.value;
      }
      
      console.log("updated data status=",data.status);
      // Prepare data for the thunk
      const updatedData = {
        id:data.Id,
        customer_name: data.PatientName,
        phone_number: data.PhoneNumber,
        specialist_id: data.SpecialistId,
        appointment_start_date: new Date(data.StartTime).toISOString(),
        appointment_end_date: new Date(data.EndTime).toISOString(),
        job: data.Job,
        status: data.status,
        PaymentInput:data.PaymentInput
      };

      console.log("Updated Data =", updatedData);
       this.props.dispatch(UpdateCustomerThunk(updatedData) as any);

      }

      else if(args.requestType=="eventCreate"){
        const statusElement = document.querySelector('input[name="attendanceStatus"]:checked') as HTMLInputElement;
      if (statusElement) {
        data[0].status = statusElement.value;
      }

      console.log("gelen veri=",data);
      
      // Prepare data[0] for the thunk
      const updatedData = {
        customer_name: data[0].PatientName,
        phone_number: data[0].PhoneNumber,
        specialist_id: data[0].SpecialistId,
        appointment_start_date: new Date(data[0].StartTime).toISOString(),
        appointment_end_date: new Date(data[0].EndTime).toISOString(),
        job: data[0].Job,
        status: data[0].status,
        PaymentInput:data[0].PaymentInput
      };

      console.log("Updated Data =", updatedData);

      this.props.dispatch(CreateCustomerThunk(updatedData) as any);

      }
    
    }
  
    if (args.requestType === 'eventRemove') {
      const id = (args.data as Record<string, any>)[0].Id;
      this.props.dispatch(DeleteCustomerThunk(id) as any);
      console.log("Customer deleted successfully!");
    }
  }
  

  render() {
    return (
      <ScheduleComponent
        ref={(schedule: ScheduleComponent | null) => this.scheduleObj = schedule}
        currentView='Day'
        eventSettings={this.state.localData}
        timeScale={this.timeScale}
        workHours={{ start: '08:00', end: '21:30', highlight: true }}
        startHour='08:00'
        endHour='21:30'
        group={this.group}
        resources={this.resources}
        actionBegin={this.onActionBegin}
        timezone='Europe/Istanbul'
        timeFormat="HH:mm"
        dateFormat='dd/MM/yyyy'
        popupOpen={this.onPopupOpen}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>


    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, any>) => ({
  dispatch
});

export default connect(null, mapDispatchToProps)(Calendar);