'use server'


import supabase from "@/config/supabase-config"



export const createNewSalonSpa = async (payload: any) => {
    try {
        const {data , error} = await supabase.from('salons_spas').insert(payload)
        if(error) throw error
        return {
            success : true,
            message : 'Salon/Spa created successfully',
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const getSalonsByOwner = async (owner_id: number) => {
    try {
        const {data , error} = await supabase.from('salons_spas').select('*').eq('owner_id', owner_id)
        if(error) throw error
        return {
            success : true,
            data : data
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const getSalonSpaById = async (salon_id: number) => {
    try {
        const {data , error} = await supabase
        .from('salons_spas')
        .select('*')
        .eq('id', salon_id)

        if(error || data.length===0) throw error || new Error('Salon/Spa not found')
            
        return {
            success : true,
            data : data[0]
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const editSalonSpaById = async ({id , payload} : {
    payload : any,
    id : number
}) => {
    try {
        const {data , error} = await supabase.from('salons_spas').update(payload).eq('id', id)
        if(error) throw error
        return {
            success : true,
            message : 'Salon/Spa updated successfully',
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const deleteSalonSpaById = async (salon_id: number) => {
    try {
        const {data , error} = await supabase.from('salons_spas').delete().eq('id', salon_id)
        if(error) throw error
        return {
            success : true,
            message : 'Salon/Spa deleted successfully',
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const getAllSalonSpas = async () => {
    try {
        const {data , error} = await supabase.from('salons_spas').select('*')
        if(error) throw error
        return {
            success : true,
            data : data
        }
    } catch (error:any) {
        return {
            success : false,
            message : error.message
        }
        
    }
}