import React from 'react'
import SalonSpaForm from '../_components/salon-spa-form'
import PageTitle from '@/components/ui/page-title'

const AddSalonSpa = () => {
  return (
     <div>
        <PageTitle title="Add Salon/Spa" />
        <SalonSpaForm formType='add'/>
    </div>
  )
}

export default AddSalonSpa