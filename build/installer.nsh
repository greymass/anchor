!macro customInstall
  WriteRegStr HKLM "SOFTWARE\Policies\Google\Chrome\URLWhitelist" "999" "esr://*"
!macroend
