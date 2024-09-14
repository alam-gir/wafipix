
import { Contact_InfoModel } from "../models/contact-info.model";
  
  export const Contact_Info_Service = {
    get: async () => {
      try {
        const contactInfos = await Contact_InfoModel.find();
        return contactInfos.length > 0 ? contactInfos[0] : null;
    } catch (error) {
        throw error;
      }
    },
  
    create: async (
      {country, city, area, phone, email}: {country: string, city: string, area: string, phone: string, email: string}
     ) => {
      try {

        const contactInfos = await Contact_InfoModel.find()

        if(contactInfos?.length === 0) {
            return await Contact_InfoModel.create({country, city, area, phone, email});
        }else{
            const contactInfoId = contactInfos[0]._id;
            return await Contact_InfoModel.findByIdAndUpdate({
                _id: contactInfoId
            }, {country, city, area, phone, email}, {new: true});    
        }
    } catch (error) {
        throw error;
      }
    },
  
  };
  