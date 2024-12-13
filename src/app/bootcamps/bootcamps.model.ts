export interface Bootcamp {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
}

export interface ResponseBootcamp {
    id: number;
    description: string;
    totalCandidate: number;
    startDate: string;
    endDate: string;
    progress: string;
    trainerName: string;
    skillName: string;
}

export interface NewBootcamp {
    description: string;
    startDate: string;
    endDate: string;
}

export interface GetBootcamp {
    message: string;
    status: string;
    data: Bootcamp
}

export interface GetBootcampById {
    message: string;
    status: string;
    data: ResponseBootcamp
}

export interface UpdateBootcampPlan {
    id: number;
    progress: number;
}

export interface UpdateBootcamp {
    id: number;
    progress: number;
    endDate: Date;
}