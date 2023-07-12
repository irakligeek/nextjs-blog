export default async function revalidatePath({host, path}){
    const res = await fetch( host + "/api/revalidate?path="+path+"&secret="+process.env.TOKEN );
    return res.json();
}