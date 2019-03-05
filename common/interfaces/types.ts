import * as Vts from 'vee-type-safe';

export import Maybe = Vts.Maybe;

export type ClassProperties<TInstance extends Vts.BasicObject> = Vts.FilterProps<
    TInstance, 
    (this: TInstance, ...args: any[]) => any, 
    Vts.FilterOpts.NotAssignable
>;