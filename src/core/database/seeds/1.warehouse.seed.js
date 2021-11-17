const sampleWarehouseData = [
    {
        title: 'tensor flow training',
        value: '<https://www.tensorflow.org/api_docs/python/tf>'
    },
    {
        title: 'kcl',
        value: 'tester'
    },
    {
        title: 'huy',
        value: 'dep trai'
    },
    {
        title: 'dsc-dut',
        value: '<https://www.dscdut.com/>'
    },
    {
        title: 'Meeting info session',
        value: 'remember to bring projector'
    },
    {
        title: 'uniGo Co,.Ltd',
        value: '<https://unigo.pro/>'
    },
];

export async function seed(knex) {
    await knex('warehouse').del();
    const insertedData = await knex('warehouse').insert(sampleWarehouseData);
    return insertedData;
}
