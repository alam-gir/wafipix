import { deleteFileFromCloudinary, uploadFileToCloudinary } from "../lib/cloudinary";
import { ApiError } from "../lib/custom-api-error-class";
import { Top_CustomerModel } from "../models/top-customer.model";

export const Top_Customer_Service = {
    getAll: async () => {
        try {
        return await Top_CustomerModel.find();
        } catch (error) {
        throw error;
        }
    },

    getById: async (id: string) => {
        try {
            const topCustomer = await Top_CustomerModel.findById(id);
            if (!topCustomer) throw new ApiError("Top Customer not found", 404);
            return topCustomer;
        } catch (error) {
        throw error;
        }
    },

    create: async ({title, logo}:{title: string, logo: Express.Multer.File}) => {
        try {
        const uploadedTop_Customer = await uploadFileToCloudinary({
            file: logo,
            folder: process.env.CLOUDINARY_TOP_CUSTOMER_FOLDER!,
        });
    
        if (!uploadedTop_Customer)
            throw new ApiError("Error uploading topCustomer to cloudinary", 400);
    
        const updatedTop_Customer = await Top_CustomerModel.create({
            title: title || "Top Customer",
            logo_url: uploadedTop_Customer.secure_url,
            public_id: uploadedTop_Customer.public_id,
        });
    
        if (!updatedTop_Customer) {
            await deleteFileFromCloudinary(uploadedTop_Customer.public_id);
            throw new ApiError("Error creating topCustomer", 400);
        } else {
            return updatedTop_Customer;
        }
        } catch (error) {
        throw error;
        }
    },

    updateTexts: async (id: string, {title}:{title: string}) => {
        try {
        const top_customer = await Top_CustomerModel.findById(id);
        
        if(!top_customer) throw new ApiError("Top Customer not found", 404);
            
        top_customer.title = title;

        return await top_customer.save();
        } catch (error) {
        throw error;
        }
    },

    updateLogo: async (id: string, {logo}: {logo: Express.Multer.File}) => {
        try {
            const top_customer = await Top_CustomerModel.findById(id);

            if (!top_customer) throw new ApiError("Top Customer not found", 404);

            const oldLogoPublicId = top_customer.public_id;

            const uploadedLogo = await uploadFileToCloudinary({
                file: logo,
                folder: process.env.CLOUDINARY_TOP_CUSTOMER_FOLDER!,
            });

            if (!uploadedLogo)
                throw new ApiError("Error uploading topCustomer to cloudinary", 400);
            
            top_customer.logo_url = uploadedLogo.secure_url;
            top_customer.public_id = uploadedLogo.public_id;

            const updatedLogo =  await top_customer.save();

            await deleteFileFromCloudinary(oldLogoPublicId);

            return updatedLogo;
        } catch (error) {
            throw error;
        }
    },

    deleteById: async (id: string) => {
        try {
            
            const topCustomer = await Top_CustomerModel.findByIdAndDelete(id);
            
            if(!topCustomer) throw new ApiError("Top Customer not found", 404);

            await deleteFileFromCloudinary(topCustomer.public_id);

            return topCustomer;
        } catch (error) {
            throw error;
        }
    }
}