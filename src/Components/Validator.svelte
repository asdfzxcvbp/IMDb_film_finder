<script lang="ts" context="module">

    export const inputIsNotValid = (Title: string) => {
        let match: Array<string> = Title.match(/[A-Za-z]/g);
        if (match != null){
            let numChars: number = match.length;
            if(numChars >= 3){
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
</script>