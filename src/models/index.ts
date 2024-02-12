export type STATUS = 'completed' | 'pending' | 'failed'

export type PRIORITY =  'urgent' | 'critical' | 'normal'

export type TASKS = {
    _id : string,
    name : string,
    description : string,
    status : STATUS,
    startDate : Date,
    endDate : Date,
    priority : PRIORITY,
    assignee : string
}[]


export type TABLEPROPS = {
    tasks : TASKS,
    handleDelete : (id : string) => void
}

