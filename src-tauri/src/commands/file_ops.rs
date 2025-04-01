use serde::{Deserialize, Serialize};
use std::fs;
use tauri::command;

#[derive(Serialize, Deserialize)]
pub struct FileResult {
    file_name: String,
    lines: Vec<String>,
}

// open a file and return its contents as lines
#[command]
pub fn open_file(file_path: String) -> Result<FileResult, String> {
    let contents = fs::read_to_string(&file_path).map_err(|e| e.to_string())?;

    let lines = contents.split('\n').map(|s| s.to_string()).collect();
    let file_name = file_path.split('/').last().unwrap_or("").to_string();

    Ok(FileResult { file_name, lines })
}

// save contents to a file
#[command]
pub fn save_file(file_path: String, contents: String) -> Result<(), String> {
    fs::write(&file_path, contents).map_err(|e| e.to_string())?;
    Ok(())
}
