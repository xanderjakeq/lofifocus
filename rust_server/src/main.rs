#![feature(proc_macro_hygiene, decl_macro)]

use tokio;
use firestore_db_and_auth::{
    Credentials,
    ServiceSession,
    documents,
    errors::Result
};
use serde::{
    Serialize, 
    Deserialize
};

use rocket_contrib::json::Json;

#[macro_use] extern crate rocket;

#[derive(Debug, Serialize, Deserialize)]
struct DemoDTO {
    Name: String,
    audio_link: String,
}

#[derive(Serialize, Deserialize)]
struct DemoPartialDTO {
    #[serde(skip_serializing_if = "Option::is_none")]
    a_string: Option<String>,
    an_int: u32,
}

#[get("/")]
fn index() -> Json<DemoDTO> {

}

//async fn testreq() {
//    let body = reqwest::get("https://lofifocus.firebaseio.com/lofifocus.json?auth=MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDeR+zDKQkc+kjj\nNyeqE3cB8fC1o5haBVMyISNkRRlSMs5TBFCPaYuKTEhSdjf2Him3lJ8/3TsJZXng\n4MIKZ/MBrxbrfXECV5rpLs2u2lKt3Z1RoPkLwpavHyUtGyWfrJxvG7XNAkRhPjyA\nisc+gdvOYFdYHLTeqJhA/hqEAZAuFMktJAWCIQJF9QajEItQhx6ELBLi93/qVggw\n7W3QLnOBs3gzdV8I6IL1HZPKMKsTrLNUBg6mhiM54PtWwi5jLH+3m87WfETaxnsy\n/bhm+krL4k4aCAl2Z93OGNmUPuY+3d4suCrKccE5HF/SZ3IAf9LqU373Gn+Z1P4i\nX/CQvgKXAgMBAAECggEATCzy90jrXhpp+zAuMCt+h9SdrOn1LriPc+kGY3kIvfI6\nYhni79r4XrtYt6Xa9MYOfuL4ll7fOg+kLoxoAz/veB7EaIyzO13BcXNAOtGILxx5\nKv3TC5Qypq4yQ9x/TtLNQ4iIC8tgmsDE5DprIMFJDldW55Pi6kF1+CP8+0s72YZT\nhiTbOGf4pKrxnR/zP6lyOyktxOB19DaXtnlKKL6ByHAhpuSI6q436a/VDg6qaF6B\nPS+vmyUqyQ2O5XiBRD7AS5sw6/zEcGitS95/xsqrSB/9k5zMb9PjYp6lpGAn0e8T\nW4Y9KqRgeroAE0mZjqTueTddZaDcUJZxgYd21mHqdQKBgQD0C+lFRA9Fq1bHvxSF\nSMJW0Z4LYfJnnr3roYuD9HqDrs686MYACoZlLTjRdq4E3wK7nJptSYYoS0YCevoB\njCklftsnPgxFrySjHguL6KZpiiln+qOfaTvNhSUF7ZQ8nwdSEzu6PHycZOy2PcHW\nHu0Ug8h1H9M6APRxydaR1V3TMwKBgQDpKxiY9gBakM8Vit8y3rW1AMhGgHERMqd4\nu0zRx2gEpixaDXfnR9f/Fhgw7kp9gIPPhKoodTIE/oZdVBYbuPYXDZwz3dV3GHho\nr44G13IixsbzYiRfVHWEeqYNn1zWqHNfgh8QCnMDi25caqdSB2AzzpgjtZ3GMAhd\n+ldoOnyTDQKBgFef6zrWjBE8yuTfY9PTYwvfKbr2iR3RbmmrUDep0U90tYA4p9cd\n8FFlok/7J9JR7F5GhWAWFRhkppd/ZkKl+6Qd3zxA2BExKJt0zzqF5zJfzCwsXxF+\nrF1HoBp3ylDV3MAIbdqZmzhgOGna1L03z3IdOx1qtuHNs/cjPGqSTKTnAoGALo3R\nOnEbfvmcryNsDv8SbpI6aoEokhN4Bo3294eFyC/ZeR1pTD827BJgQBzDuK0ZJCzL\nwIots3uSHj40r9JNKCsqfdyTy1SSbexnQgxwGGtxu5RjyLjXQd0vHFcuNRmq923G\nf/BmKFYFceRFhgY8+fsMu0x+tNxQP1tFamULDF0CgYAENUbuxAcldsBWO8zkPMcs\nbl9gihUCHfsOyyhno+QrZNYERdM31yPM8ZWie5am0nFCbGtUtMry9pf2+MftXNDc\nsGh0s3vlW+v7fXpmYOPH7Yb5H7nv83WRHZNXzchKx42GwgCUnY/Nf2hG2j11yWOm\nJ+ZR4ltcMe6FlUzqEMY8xQ==")
//            .await.unwrap();
//                //.text()
//                //    .await.unwrap();
//
//    println!("body = {:?}", body);
//}
//

fn get_session() -> ServiceSession {
    let cred = Credentials::from_file("serviceAccount.json")
        .expect("Read Credentials file");
    ServiceSession::new(cred)
        .expect("Create a service account session")
}

#[tokio::main]
async fn main() {
//fn main() {
    
    let blocking_task = tokio::task::spawn_blocking(|| {
        let session = get_session();

        let values: documents::List<DemoDTO, _> = documents::list(&session, "test");

        for doc_result in values {
            let (doc, _metadata) = doc_result.unwrap();
            println!("{:?}", doc);
        }
    });
    blocking_task.await.unwrap();


    rocket::ignite().mount("/", routes![index]).launch();

    //testreq().await;
}
