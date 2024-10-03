export interface Resources {
    resourceId: number;
    resourceName: string;
    resourcesDescription: string;
    resourceType: ResourceType;
    resourcesCost: number;
}

export enum ResourceType {
    STATUS_1 = 'MATERIAL',
    STATUS_2 = 'SOFTWARE',
    
}
