require "json"
require "date"

WORKERS_STATUS = {
  medic: {
    price_per_shift: 270
  },
  interne: {
    price_per_shift: 126
  },
  interim: {
    price_per_shift: 480
  }
}

SHIFT_RATE = 1
WEEKEND_SHIFT_RATE = SHIFT_RATE * 2
COMMISSION_SERVICE = 0.05
COMMISSION_INTERIM = 80

class NightShiftManager

  def initialize(filePath)
    file = File.read filePath

    @data = JSON.parse(file)
  end

  def getWorkerShifts(id)
    return @data['shifts'].find_all { |shift| shift['user_id'] == id }
  end

  def getWorkerPrice(id)
    worker = @data['workers'].find { |worker| worker['id'] == id }

    return WORKERS_STATUS[worker['status'].to_sym][:price_per_shift]
  end

  def getShiftsRate(shifts)
    rate = 0

    shifts.each do |shift|
      day = Date.parse(shift['start_date'])
       rate += day.sunday? || day.saturday? ? WEEKEND_SHIFT_RATE : SHIFT_RATE
    end

    return rate
  end

  def getFee(id, price, nbShifts)

    worker = @data['workers'].find { |worker| worker['id'] == id }

    fixFee = workerIsInterim(id) ? COMMISSION_INTERIM * nbShifts : 0

    return fixFee + price * COMMISSION_SERVICE
  end

  def workerIsInterim(id)
    worker = @data['workers'].find { |worker| worker['id'] == id }

    return worker['status'] == 'interim'
  end

  def writeJSON(data, filePath)
    File.open(filePath,'w') do |f|
      f.write(JSON.pretty_generate(data))
    end
  end

  def workersPrices(outputFile)
    output = {
      workers: [],
      commission: {
        pdg_fee: 0,
        interim_shifts: 0
      }
    }

    @data['workers'].each do |worker|
      workerId = worker['id']

      workerShifts = getWorkerShifts(workerId)
      shiftsRate = getShiftsRate(workerShifts)
      workerPrice = getWorkerPrice(workerId) * shiftsRate

      output[:workers].push({ id: workerId, price: workerPrice })

      output[:commission][:pdg_fee] += getFee(workerId, workerPrice, workerShifts.length)
      output[:commission][:interim_shifts] += workerIsInterim(workerId) ? workerShifts.length : 0
    end

    writeJSON(output, outputFile)

    puts 'Done.'
  end

  private :getWorkerShifts, :getWorkerPrice, :getShiftsRate, :writeJSON
end

ns = NightShiftManager.new('./data.json')

ns.workersPrices('output.json')

