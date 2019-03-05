import * as Vts from 'vee-type-safe';

export const PayloadTD = Vts.td({
    sub: Vts.isZeroOrPositiveInteger
});

export type Payload = Vts.TypeDescriptionTarget<typeof PayloadTD>;