const sampleSlidesData = [
    {
        slide_title: 'tensor flow training',
        slide_url: 'https://www.tensorflow.org/api_docs/python/tf'
    },
    {
        slide_title: 'git training',
        slide_url: 'https://learngitbranching.js.org/?locale=vi'
    },
    {
        slide_title: 'info session',
        slide_url: 'https://google.dscdut.com/event/info-session'
    },
    {
        slide_title: 'dsc-dut',
        slide_url: 'https://www.dscdut.com/'
    },
    {
        slide_title: 'huy dep trai',
        slide_url: 'https://www.facebook.com/nhenh.snl/'
    },
    {
        slide_title: 'uniGo Co,.Ltd',
        slide_url: 'https://unigo.pro/'
    },
];

export async function seed(knex) {
    await knex('slides').del();
    const insertedData = await knex('slides').insert(sampleSlidesData);
    return insertedData;
}
