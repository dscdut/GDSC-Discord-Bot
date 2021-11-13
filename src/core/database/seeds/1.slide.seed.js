const sampleSlidesData = [
    {
        title: 'tensor flow training',
        url: 'https://www.tensorflow.org/api_docs/python/tf'
    },
    {
        title: 'git training',
        url: 'https://learngitbranching.js.org/?locale=vi'
    },
    {
        title: 'info session',
        url: 'https://google.dscdut.com/event/info-session'
    },
    {
        title: 'dsc-dut',
        url: 'https://www.dscdut.com/'
    },
    {
        title: 'huy dep trai',
        url: 'https://www.facebook.com/nhenh.snl/'
    },
    {
        title: 'uniGo Co,.Ltd',
        url: 'https://unigo.pro/'
    },
];

export async function seed(knex) {
    await knex('slides').del();
    const insertedData = await knex('slides').insert(sampleSlidesData);
    return insertedData;
}
