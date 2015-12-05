/**
 * Created by bai on 2015/9/6.
 */



Weather.attachSchema(new SimpleSchema({
  areaid: {
    type: Number
  },
  type: {
    type: String
  },
  date: {
    type: Date
  },
  content: {
    type: Object,
    blackbox: true
  }
}));

