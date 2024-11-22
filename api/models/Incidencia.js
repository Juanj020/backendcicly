import mongoose from 'mongoose' ;
import { v4 as uuidv4 } from 'uuid';

const optionalFieldsSchema = new mongoose.Schema({
  boolean1: Boolean,
  boolean2: Boolean,
  boolean3: Boolean,
  boolean4: Boolean,
  boolean5: Boolean,
  number1: Number,
  number2: Number,
  number3: Number,
  number4: Number,
  number5: Number,
  text1: String,
  text2: String,
  text3: String,
  text4: String,
  text5: String,
  memo1: String,
  memo2: String,
  memo3: String,
  memo4: String,
  memo5: String,
  date1: Date,
  date2: Date,
  date3: Date,
  date4: Date,
  date5: Date,
  searchlist1: {
    id: { type: String, default: uuidv4 }, // Cambiado a UUID
    name: String,
  },
  searchlist2: {
    id: { type: String, default: uuidv4 },
    name: String,
  },
  searchlist3: {
    id: { type: String, default: uuidv4 },
    name: String,
  },
  searchlist4: {
    id: { type: String, default: uuidv4 },
    name: String,
  },
  searchlist5: {
    id: { type: String, default: uuidv4 },
    name: String,
  },
});

const IncidentSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 }, // UUID como ID principal
  number: String,
  caller: {
    branch: { id: { type: String, default: uuidv4 } },
    dynamicName: String,
    phoneNumber: String,
    mobileNumber: String,
    email: String,
    department: {
      id: { type: String, default: uuidv4 },
      name: String,
    },
    location: { id: { type: String, default: uuidv4 } },
    budgetHolder: {
      id: { type: String, default: uuidv4 },
      name: String,
    },
    personExtraFieldA: {
      id: { type: String, default: uuidv4 },
      name: String,
    },
    personExtraFieldB: {
      id: { type: String, default: uuidv4 },
      name: String,
    },
  },
  callerLookup: { id: { type: String, default: uuidv4 } },
  status: String,
  briefDescription: String,
  request: String,
  action: String,
  actionInvisibleForCaller: Boolean,
  entryType: { id: { type: String, default: uuidv4 }, name: String },
  callType: { id: { type: String, default: uuidv4 }, name: String },
  category: { id: { type: String, default: uuidv4 }, name: String },
  subcategory: { id: { type: String, default: uuidv4 }, name: String },
  externalNumber: String,
  object: { id: { type: String, default: uuidv4 }, name: String },
  location: { id: { type: String, default: uuidv4 } },
  branch: { id: { type: String, default: uuidv4 } },
  mainIncident: {
    id: { type: String, default: uuidv4 },
    number: String,
  },
  impact: { id: { type: String, default: uuidv4 }, name: String },
  urgency: { id: { type: String, default: uuidv4 }, name: String },
  priority: { id: { type: String, default: uuidv4 }, name: String },
  duration: { id: { type: String, default: uuidv4 }, name: String },
  targetDate: Date,
  sla: { id: { type: String, default: uuidv4 } },
  onHold: Boolean,
  operator: { id: { type: String, default: uuidv4 } },
  operatorGroup: { id: { type: String, default: uuidv4 } },
  supplier: { id: { type: String, default: uuidv4 } },
  processingStatus: { id: { type: String, default: uuidv4 }, name: String },
  responded: Boolean,
  responseDate: Date,
  completed: Boolean,
  completedDate: Date,
  closed: Boolean,
  closedDate: Date,
  closureCode: { id: { type: String, default: uuidv4 }, name: String },
  costs: Number,
  feedbackRating: Number,
  feedbackMessage: String,
  majorCall: Boolean,
  majorCallObject: {
    id: { type: String, default: uuidv4 },
    name: String,
  },
  publishToSsd: Boolean,
  optionalFields1: optionalFieldsSchema,
  optionalFields2: optionalFieldsSchema,
  externalLink: {
    id: { type: String, default: uuidv4 },
    type: String,
    date: String,
  },
});

const Incident = mongoose.model('Incident', IncidentSchema);
export default Incident;