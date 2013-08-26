var attemptingJoin = false;
var failed = false;

function join()
    {
	attemptingJoin = true;
	failed=false;
		
		//This is a backup to lower chances of failing to join as it runs as the song changes.
		//I have put this code before the main join function because it uses a listener which needs
		//to be running while the other code is executing.
		javascript:API.on(API.WAIT_LIST_UPDATE, singleShotJoin);
		function singleShotJoin()
			{
			if (attemptingJoin==true)
				{
				if(API.getWaitListPosition(API.getUser().id)>-1)
					{
					console.log("joined");
					attemptingJoin = false;
					}
				if (attemptingJoin==true)
					{
					console.log("singleshot running");
					var waitingCount = API.getWaitList().length;
					if (waitingCount<50)
						{
						API.djJoin();
						}
					}
				}
			}
		
		
		
		
		
		var timeZ=API.getTimeRemaining();
		console.log("join in progress1");
		setTimeout(function()
			{
			if (attemptingJoin==true)
				{
				console.log("join in progress2");
				var add = setInterval(function()
					{
					if (attemptingJoin==true)
						{
						console.log("join in progress3");
						
						
						API.djJoin();
						if(API.getWaitListPosition(API.getUser().id)>-1)
							{
							console.log("joined");
							cancelJoin();
							clearInterval(add);
							}
						if (API.getTimeRemaining()>1)
							{
							console.log("failed to join");
							failed=true;
							cancelJoin();
							clearInterval(add);
							}
						}
						else
						{
						clearInterval(add);
						}
					},30);
				}
			},(timeZ*1000)-1000);
	}

function CommandCalled(value)
	{
		
	if (value=="/1")
		{
		join();
		}
	if (value=="/2")
		{
		cancelJoin();
		}
	}
	
function cancelJoin()
	{
		attemptingJoin = false;
		console.log("join canceled");
		if (failed==true)
			{
			setTimeout(function()
				{
				join(API.getUser().id);
				},5000);
			}
	}
		
API.on(API.CHAT_COMMAND, CommandCalled);	
